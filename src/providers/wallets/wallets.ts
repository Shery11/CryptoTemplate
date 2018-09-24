import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CoinMarketProvider } from '../coinmarket/coinmarket';
import { Wallet } from './wallet'

import { Transaction, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../transactions/transaction';

/*
  Generated class for the WalletsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WalletsProvider {

  static wallets: Wallet[] = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      order: 1,
      total: 10.123456
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      order: 2,
      total: 100.334455
    },
    {
      id: 'dash',
      name: 'Dash',
      symbol: 'DASH',
      order: 3,
      total: 10000.678901
    },
    {
      id: 'ripple',
      name: 'Ripple',
      symbol: 'XRP',
      order: 4,
      total: 100000.115577
    },
    {
      id: 'litecoin',
      name: 'Litecoin',
      symbol: 'LTC',
      order: 5,
      total: 1000.226688
    },
  ];

  constructor(public http: HttpClient,
    public coinMarket: CoinMarketProvider) {
    console.log('Hello WalletsProvider Provider');
  }

  addWallet(wallet: Wallet) {
    WalletsProvider.wallets.push(wallet);
  }

  getCoins() {
    return WalletsProvider.wallets;
  }

  totalBTC(): Promise<number> {
    return new Promise((resolve, reject) => {
      let total = 0.0;
      this.coinMarket.ticker()
        .subscribe((data: any) => {
          WalletsProvider.wallets.forEach(coin => {
            let totalCoin = 0.0;
            data.forEach((coinMarket: any) => {
              if (coin.id === coinMarket.id) {
                totalCoin = coin.total * parseFloat(coinMarket.price_btc);
              }
            });
            total += totalCoin;

            console.log(coin.name, coin.total, totalCoin, 'BTC');
          });
          resolve(total);
        }, error => {
          reject(error);
        });
    });
  }

  totalUSD(): Promise<number> {
    return new Promise((resolve, reject) => {
      let total = 0.0;
      this.coinMarket.ticker()
        .subscribe((data: any) => {
          WalletsProvider.wallets.forEach((coin: Wallet) => {
            let totalCoin = 0.0;
            data.forEach(coinMarket => {
              if (coin.id === coinMarket.id) {
                totalCoin = coin.total * parseFloat(coinMarket.price_usd);
              }
            });
            total += totalCoin;

            console.log(coin.name, coin.total, totalCoin, 'USD');
          });
          resolve(total);
        }, error => {
          reject(error);
        });
    });
  }

  send(coin: Wallet, amount: number): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      let flgFounded = false;
      WalletsProvider.wallets.forEach(wallet => {
        if (coin.id === wallet.id) {
          flgFounded = true;
          if (wallet.total > amount) {
            wallet.total = wallet.total - amount;
            let trans = new Transaction();
            let now = new Date();
            trans.id = 'T' + now.getTime().toString();
            trans.amount = amount;
            trans.date = now.getTime();
            trans.type = TRANSACTION_TYPE.OUT;
            trans.status = TRANSACTION_STATUS.VERIFYING;
            trans.coin = coin;
            resolve(trans);
          } else {
            reject(new Error('Wallet not have enough coins'));
          }
        }
      });
      if (!flgFounded) {
        reject(new Error('Can not find Wallet'));
      }
    });
  }

  receive(coin: Wallet, amount: number): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      let flgFounded = false;
      WalletsProvider.wallets.forEach(wallet => {
        if (coin.id === wallet.id) {
          wallet.total = wallet.total + amount;
          let trans = new Transaction();
          let now = new Date();
          trans.id = 'T' + now.getTime().toString();
          trans.amount = amount;
          trans.date = now.getTime();
          trans.type = TRANSACTION_TYPE.IN;
          trans.status = TRANSACTION_STATUS.VERIFYING;
          trans.coin = coin;
          resolve(trans);
        }
      });
      if (!flgFounded) {
        reject(new Error('Can not find Wallet'));
      }
    });
  }
}
