import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';
import { CoinProvider } from '../../providers/coin/coin';
import { Coin } from '../../providers/wallets/coin';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  coins: Array<Coin>;
  getIcon = CoinProvider.getIcon;
  loading: Loading;
  constructor(public navCtrl: NavController,
    public coinMarket: CoinMarketProvider,
    public local: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.coins = new Array<Coin>();
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    this.coinMarket.ticker()
      .subscribe(data => {
        this.coins = <any[]>data;
        console.log(this.coins);
        this.loading.dismiss()
          .then()
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
    // this.local.remove('bitcoin');
  }

  detail(coin: Coin) {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();

    this.local.get(coin.id)
      .then(data => {
        if (data) {
          let now = new Date();
          let coinData = JSON.parse(data);
          if ((now.getTime() - coinData.last_update) > (1000 * 60 * 15)) {
            this.getCoinMarket(coin)
              .then(history => {
                this.loading.dismiss()
                  .then(() => {
                    let multi = history;
                    let current = new Date();
                    let newCoinData = {
                      last_update: current.getTime(),
                      multi: multi
                    }
                    this.local.set(coin.id, JSON.stringify(newCoinData))
                      .then(() => {
                        this.navCtrl.push('CoinPage', { coin: coin, multi: multi });
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            this.loading.dismiss()
              .then(() => {
                let multi = coinData.multi;
                this.navCtrl.push('CoinPage', { coin: coin, multi: multi });
              })
              .catch(error => {
                console.log(error);
              });
          }
        } else {
          this.getCoinMarket(coin)
            .then(history => {
              this.loading.dismiss()
                .then(() => {
                  let multi = history;
                  let current = new Date();
                  let newCoinData = {
                    last_update: current.getTime(),
                    multi: multi
                  }
                  this.local.set(coin.id, JSON.stringify(newCoinData))
                    .then(() => {
                      this.navCtrl.push('CoinPage', { coin: coin, multi: multi });
                    })
                    .catch(error => {
                      console.log(error);
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
      })
      .catch(error => {
        this.loading.dismiss()
          .then(() => {
            console.log(error);
          });
      });
  }

  getCoinMarket(coin: Coin): Promise<any> {
    return new Promise((resolve, reject) => {
      let multi = [
        // {
        //   'name': 'Market Cap',
        //   'series': []
        // },
        {
          'name': 'Price',
          'series': []
        },
        {
          'name': 'Volume',
          'series': []
        }
      ];

      this.coinMarket.history(coin.symbol)
        .subscribe(data => {
          // data['market_cap'].forEach(line => {
          //   let date = new Date(line[0]);
          //   multi[0].series.push({
          //     'name': `${date.getMonth().toString()}/${date.getDate().toString()}`,
          //     'value': line[1]
          //   })
          // });

          data['price'].forEach(line => {
            let date = new Date(line[0]);
            multi[0].series.push({
              'name': `${(date.getMonth()+1).toString()}/${date.getDate().toString()}`,
              'value': line[1]
            })
          });

          data['volume'].forEach(line => {
            let date = new Date(line[0]);
            multi[1].series.push({
              'name': `${(date.getMonth()+1).toString()}/${date.getDate().toString()}`,
              'value': line[1]
            })
          });

          resolve(multi);
          // this.loading.dismiss()
          //   .then(() => {
          //     this.navCtrl.push('CoinPage', { coin: coin, multi: multi });
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
        }, error => {
          reject(error);
          // this.loading.dismiss()
          //   .then(() => {
          //     console.log(error);
          //   });
        });
    });
  }
}
