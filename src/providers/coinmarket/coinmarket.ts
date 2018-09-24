import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CoinmarketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  Key: TTRjDZYDrNzUDUl7ODhyA4mH54I8OP 
  https://www.worldcoinindex.com/apiservice/json?key={key}
*/
@Injectable()
export class CoinMarketProvider {
  // local use
  // coinMarketCap: string = 'http://localhost:3456';
  // my server
  coinMarketCap: string = 'http://159.203.92.71:3456';
  coinCapIO: string = 'http://coincap.io';
  constructor(public http: HttpClient) {
    console.log('Hello CoinmarketProvider Provider');
  }

  ticker() {
    return this.http.get(`${this.coinMarketCap}/ticker`);
  }

  convert(coin: string, currency?: string) {
    if(currency) {
      return this.http.get(`${this.coinMarketCap}/convert/${coin}/${currency}`);
    } else {
      return this.http.get(`${this.coinMarketCap}/convert/${coin}`);
    }
  }

  global(currency?: string) {
    if(currency) {
      return this.http.get(`${this.coinMarketCap}/global/${currency}`);
    } else {
      return this.http.get(`${this.coinMarketCap}/global`);
    }
  }

  history(coin: string) {
    return this.http.get(`${this.coinCapIO}/history/7day/${coin}`); 
  }
}
