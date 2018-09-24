import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';

import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';
import { CoinProvider } from '../../providers/coin/coin';

import { Coin } from '../../providers/wallets/coin';
import { Wallet } from '../../providers/wallets/wallet';
import { WalletsProvider } from '../../providers/wallets/wallets';

import { Transaction, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../providers/transactions/transaction';
import { TransactionsProvider } from '../../providers/transactions/transactions';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the SendcoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendcoin',
  templateUrl: 'sendcoin.html',
})
export class SendcoinPage {
  getIcon = CoinProvider.getIcon;
  segment: string = 'balance';
  coins: Wallet[];
  totalBTC: number = 0.0;
  totalUSD: number = 0.0;
  minAmount: number = 0.0;
  maxAmount: number = 0.0;
  transactions: Transaction[];
  exchangeCoin: Wallet;
  qrCode: string = '11234234234235253534534563465346456457457467474757457457';
  walletCoins: Array<Coin>;
  modal: Modal;
  sendAmount: number = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public coinMarket: CoinMarketProvider,
    public wallets: WalletsProvider,
    public barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController,
    public transactionProvider: TransactionsProvider) {
    this.coins = this.wallets.getCoins();
    this.walletCoins = new Array<Coin>();
    if (navParams.get('coin')) {
      let coin: Coin = navParams.get('coin');
      this.coins.forEach(wallet => {
        if (wallet.id === coin.id) {
          this.exchangeCoin = wallet;
        }
      });
    } else {
      this.exchangeCoin = this.coins[0];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendcoinPage');
    this.transactions = this.transactionProvider.getTransactions();

    this.coinMarket.ticker()
      .subscribe((data: any) => {
        this.coins.forEach(wallet => {
          data.forEach(coin => {
            if (coin.id === wallet.id) {
              this.walletCoins.push(coin);
            }
          });
        });
      }, error => {
        console.log(error);
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

  chooseCoin() {
    this.modal = this.modalCtrl.create('CoinsPage', { coins: this.walletCoins });
    this.modal.present();
    this.modal.onDidDismiss(data => {
      if (data) {
        let coin = data.coin;
        this.coins.forEach(wallet => {
          if (wallet.id === coin.id) {
            this.exchangeCoin = wallet;
          }
        });
      }
    });
  }

  scanQRCode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.qrCode = barcodeData.text;
    }, (err) => {
      // An error occurred
      console.log(JSON.stringify(err));
    });
  }

  cancel() {
    this.sendAmount = 0;
  }

  send() {
    if (this.sendAmount > 0.001) {
      let trans = new Transaction();
      let now = new Date();
      trans.id = now.getTime().toString();
      trans.amount = this.sendAmount;
      trans.type = TRANSACTION_TYPE.OUT;
      trans.status = TRANSACTION_STATUS.VERIFYING;
      trans.date = now.getTime();
      trans.coin = this.exchangeCoin;

      this.wallets.send(this.exchangeCoin, trans.amount)
        .then(trans => {
          this.transactionProvider.add(trans);
          let modal = this.modalCtrl.create('CongratulationPage');
          modal.present();

          modal.onDidDismiss(() => {
            this.navCtrl.setRoot('WalletsPage');
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
