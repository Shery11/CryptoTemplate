import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';
import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';
import { CoinProvider } from '../../providers/coin/coin';
import { Coin } from '../../providers/wallets/coin';

import { Wallet } from '../../providers/wallets/wallet';
import { WalletsProvider } from '../../providers/wallets/wallets';
import { NgxChartsModule, ColorHelper } from '@swimlane/ngx-charts';
/**
 * Generated class for the CoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coin',
  templateUrl: 'coin.html',
})
export class CoinPage {
  coin: Coin;
  getIcon = CoinProvider.getIcon;
  view: any[] = [300, 400];
  multi: Array<any>
  single = [
    {
      "name": "Market Cap",
      "value": 8940000
    },
    {
      "name": "Price",
      "value": 5000000
    },
    {
      "name": "Volume",
      "value": 7200000
    }
  ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = false;
  yAxisLabel = 'Volume';

  colorScheme = {
    domain: ['#FAA420', '#32db64', '#f53d3d'],
    colors: '#FFFFFF'
  };

  // line, area
  autoScale = true;
  myWallets: Wallet[];
  constructor(public navCtrl: NavController,
    public coinMarket: CoinMarketProvider,
    public platform: Platform,
    public wallets: WalletsProvider,
    public navParams: NavParams) {
    this.view = [this.platform.width(), 300];
    this.myWallets = this.wallets.getCoins();

    if (navParams.get('coin')) {
      this.coin = navParams.get('coin');
      console.log(this.coin);
    } else {
      this.coin = new Coin();
      this.coin.id = 'bitcoin';
      this.coin.name = 'Bitcoin';
      this.coin.symbol = 'BTC';
    }

    if (navParams.get('multi')) {
      this.multi = navParams.get('multi');
    } else {
      this.multi = [];
    }


    // this.coinMarket.history(this.coin.symbol)
    //   .subscribe(data => {
    //     for (var i = data['market_cap'].length - 1; i > data['market_cap'].length - 10; i--) {
    //       let marketCap = data['market_cap'];
    //       let line = marketCap[i];
    //       let date = new Date(line[0]);
    //       console.log(date.toISOString());
    //       this.multi[0].series.push({
    //         'name': date.toISOString(),
    //         'value': line[1]
    //       })
    //     }
    //     // data['market_cap'].forEach(line => {
    //     //   console.log(line);
    //     //   let date = new Date(line[0]);
    //     //   console.log(date.toISOString());
    //     //   this.multi[0].series.push({
    //     //     'name': date.toISOString(),
    //     //     'value': line[1]
    //     //   })
    //     // });        
    //   }, error => {
    //     console.log(error);
    //   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinPage');
  }

  onSelect($event) {
    console.log($event);
  }

  inWallet(): boolean {
    let result: boolean = false;

    this.myWallets.forEach(wallet => {
      if (this.coin.id === wallet.id) {
        result = true;
      }
    });

    return result;
  }
  exchange() {
    this.navCtrl.setRoot('ExchangePage', { coin: this.coin });
  }
  send() {
    this.navCtrl.setRoot('SendcoinPage', { coin: this.coin });
  }
}
