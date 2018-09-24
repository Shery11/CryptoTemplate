import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CoinProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoinProvider {
  public static getIcon(coin: any): string {
    if (coin.id !== 'iota'
      && coin.id !== 'cardano'
      && coin.id !== 'bytecoin-bcn'
      && coin.id !== 'ardor'
      && coin.id !== 'hshare'
      && coin.id !== 'waves'
      && coin.id !== 'omisego') {
      return `assets/imgs/coinicons/${coin.id}.png`;
    } else {
      return `assets/imgs/coinicons/${coin.id}.svg`;
    }
  }
}
