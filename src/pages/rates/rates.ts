import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';
import { CoinProvider } from '../../providers/coin/coin';

import { Wallet } from '../../providers/wallets/wallet';
import { WalletsProvider } from '../../providers/wallets/wallets';

import { Transaction, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../providers/transactions/transaction';
import { TransactionsProvider } from '../../providers/transactions/transactions';
/**
 * Generated class for the RatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rates',
  templateUrl: 'rates.html',
})
export class RatesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatesPage');
  }

}
