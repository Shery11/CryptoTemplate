import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { CoinProvider } from '../../providers/coin/coin';
import { Coin } from '../../providers/wallets/coin';
/**
 * Generated class for the CoinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coins',
  templateUrl: 'coins.html',
})
export class CoinsPage {
  coins: Array<Coin>;
  getIcon = CoinProvider.getIcon;
  selectedCoin: Coin;
  constructor(public navCtrl: NavController,
    public view: ViewController,
    public navParams: NavParams) {
      this.coins = navParams.get('coins');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinsPage');
    
  }

  select(coin: Coin) {
    this.selectedCoin = coin;

    this.dismiss();
  }

  dismiss() {
    var data = {
      coin: this.selectedCoin
    }
    // Returning data from the modal:
    this.view.dismiss(
      data
    );
  }

  close() {
    this.navCtrl.pop();
  }
}
