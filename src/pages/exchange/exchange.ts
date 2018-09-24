import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, Loading, LoadingController } from 'ionic-angular';

import { Wallet } from '../../providers/wallets/wallet';
import { WalletsProvider } from '../../providers/wallets/wallets';
import { Slides } from 'ionic-angular';
import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';
import { CoinProvider } from '../../providers/coin/coin';
import { Coin } from '../../providers/wallets/coin';

import { Transaction, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../providers/transactions/transaction';
import { TransactionsProvider } from '../../providers/transactions/transactions';
/**
 * Generated class for the ExchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {
  totalBTC: number = 0.0;
  totalUSD: number = 0.0;
  @ViewChild(Slides) slides: Slides;

  exchangeAmount: number = 0;
  receiveAmount: number = 0;

  getIcon = CoinProvider.getIcon;

  exchangeCoin: Coin;
  receiveCoin: Coin;

  myWallets: Array<Wallet>;
  myWallet: Wallet;
  walletCoins: Array<Coin>;
  coins: Array<Coin>;
  loading: Loading;
  modal: Modal;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public coinMarket: CoinMarketProvider,
    public transactionProvider: TransactionsProvider,
    public wallets: WalletsProvider, ) {
    this.coins = new Array<Coin>();
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExchangePage');
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);

    this.walletCoins = new Array<Coin>();
    this.coinMarket.ticker()
      .subscribe(data => {
        this.coins = <any[]>data;
        console.log(this.coins);
        this.loading.dismiss()
          .then(() => {
            this.myWallets = this.wallets.getCoins();

            this.myWallets.forEach(wallet => {
              this.coins.forEach(coin => {
                if (wallet.id === coin.id) {
                  this.walletCoins.push(coin);
                }
              })
            });

            if (this.navParams.get('coin')) {
              let coin: Coin = this.navParams.get('coin');
              if (coin.id !== 'bitcoin') {
                this.walletCoins.forEach(wallet => {
                  if (coin.id === wallet.id) {
                    this.exchangeCoin = wallet;
                    this.receiveCoin = this.walletCoins[0];
                  }
                });
              } else {
                this.exchangeCoin = this.walletCoins[0];
                this.receiveCoin = this.walletCoins[1];
              }
            } else {
              this.exchangeCoin = this.walletCoins[0];
              this.receiveCoin = this.walletCoins[1];
            }
            this.setWallet(this.exchangeCoin);
          })
          .catch(error => {
            console.log(error);
          });
      }, error => {
        console.log(error);
        this.loading.dismiss()
          .then()
          .catch(error => {
            console.log(error);
          });
      });
  }

  setWallet(exchangeCoin: Coin) {
    this.myWallets.forEach(wallet => {
      if (wallet.id === exchangeCoin.id) {
        this.myWallet = wallet;
      }
    });
  }

  minAmount: number = 0.0;
  maxAmount: number = 0.0;
  rate: number = 0.0;
  calculate(amount: number) {
    this.coinMarket.convert(this.exchangeCoin.id, this.receiveCoin.symbol.toLowerCase())
      .subscribe(data => {
        let coin = data[0];
        this.rate = parseFloat(coin['price_' + this.receiveCoin.symbol.toLowerCase()]);
        this.receiveAmount = amount * parseFloat(coin['price_' + this.receiveCoin.symbol.toLowerCase()]);
        this.maxAmount = this.myWallet.total * parseFloat(coin['price_' + this.receiveCoin.symbol.toLowerCase()]);
        this.minAmount = 0.01 * parseFloat(coin['price_' + this.receiveCoin.symbol.toLowerCase()]);
      }, error => {
        console.log(error);
      });
  }

  calcReceive() {
    if (this.exchangeAmount > 0) {
      this.calculate(this.exchangeAmount);
    }
  }

  chooseCoin(coin: Coin) {
    if (coin.id === this.exchangeCoin.id) {
      this.modal = this.modalCtrl.create('CoinsPage', { coins: this.walletCoins });
    } else if (coin.id === this.receiveCoin.id) {
      this.modal = this.modalCtrl.create('CoinsPage', { coins: this.coins });
    }

    this.modal.present();
    this.modal.onDidDismiss(data => {
      if (data) {
        if (coin.id === this.exchangeCoin.id && data.coin.id !== this.receiveCoin.id) {
          this.exchangeCoin = data.coin;
          this.setWallet(this.exchangeCoin);
        } else if (coin.id === this.receiveCoin.id && data.coin.id !== this.exchangeCoin.id) {
          this.receiveCoin = data.coin;
        }

        this.calcReceive();
      }
    });
  }

  ionViewWillEnter() {
    this.wallets.totalBTC()
      .then(total => {
        this.totalBTC = total;
      })
      .catch(error => {
        console.log(error);
      });

    this.wallets.totalUSD()
      .then(total => {
        this.totalUSD = total;
      })
      .catch(error => {
        console.log(error);
      });
  }

  clear() {
    this.exchangeAmount = 0;
    this.receiveAmount = 0;
  }

  next() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);
  }

  cancel() {
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);
  }

  confirm() {
    let now = new Date();

    this.wallets.send(this.myWallet, this.exchangeAmount)
      .then(trans => {
        this.transactionProvider.add(trans);

        let coin: Wallet;
        this.myWallets.forEach(wallet => {
          if (wallet.id === this.receiveCoin.id) {
            coin = wallet;
          }
        });

        this.wallets.receive(coin, this.receiveAmount)
          .then(trans2 => {
            this.transactionProvider.add(trans2)

            let modal = this.modalCtrl.create('CongratulationPage');
            modal.present();

            modal.onDidDismiss(() => {
              this.navCtrl.setRoot('WalletsPage');
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
