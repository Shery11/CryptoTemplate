import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';
import { CoinProvider } from '../../providers/coin/coin';

import { Wallet } from '../../providers/wallets/wallet';
import { WalletsProvider } from '../../providers/wallets/wallets';

import { Transaction, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../providers/transactions/transaction';
import { TransactionsProvider } from '../../providers/transactions/transactions';
/**
 * Generated class for the WalletsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class WalletsPage {
  getIcon = CoinProvider.getIcon;
  segment: string = 'balance';
  coins: Wallet[];
  totalBTC: number = 0.0;
  totalUSD: number = 0.0;
  transactions: Transaction[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public coinMarket: CoinMarketProvider,
    public wallets: WalletsProvider,
    public transactionProvider: TransactionsProvider) {
    this.transactions = new Array<Transaction>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletsPage');
    this.coins = this.wallets.getCoins();
  }

  ionViewWillEnter() {
    this.transactions = this.transactionProvider.getTransactions();
    
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
}
