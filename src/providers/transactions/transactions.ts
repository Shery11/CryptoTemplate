import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Transaction, TRANSACTION_STATUS, TRANSACTION_TYPE } from './transaction';
import { Wallet } from '../wallets/wallet';
import { WalletsProvider } from '../wallets/wallets';
/*
  Generated class for the TransactionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class TransactionsProvider {
  now: Date = new Date;
  HOUR: number = 1000 * 60 * 60;
  coins: Wallet[];
  static transactions: Transaction[] = [
    {
      id: 'T000000001',
      type: TRANSACTION_TYPE.IN,
      date: 0,
      amount: 1.25,
      status: TRANSACTION_STATUS.COMPLETE,
      coin: null
    },
    {
      id: 'T000000002',
      type: TRANSACTION_TYPE.OUT,
      date: 1,
      amount: 10.50,
      status: TRANSACTION_STATUS.VERIFYING,
      coin: null
    },
    {
      id: 'T000000003',
      type: TRANSACTION_TYPE.IN,
      date: 2,
      amount: 5.25,
      status: TRANSACTION_STATUS.COMPLETE,
      coin: null
    },
    {
      id: 'T000000004',
      type: TRANSACTION_TYPE.OUT,
      date: 3,
      amount: 3.25,
      status: TRANSACTION_STATUS.COMPLETE,
      coin: null
    },
    {
      id: 'T000000005',
      type: TRANSACTION_TYPE.IN,
      date: 4,
      amount: 5.25,
      status: TRANSACTION_STATUS.REJECT,
      coin: null
    },
  ];
  constructor(public http: HttpClient, public wallets: WalletsProvider) {
    console.log('Hello TransactionsProvider Provider');
    this.coins = new Array<Wallet>();
    this.coins = this.wallets.getCoins();
    TransactionsProvider.transactions[0].date = (new Date(this.now.getTime() - this.HOUR * 3)).getTime();
    TransactionsProvider.transactions[0].coin = this.coins[0];
    TransactionsProvider.transactions[1].date = (new Date(this.now.getTime() - this.HOUR * 4)).getTime();
    TransactionsProvider.transactions[1].coin = this.coins[1];
    TransactionsProvider.transactions[2].date = (new Date(this.now.getTime() - this.HOUR * 5)).getTime();
    TransactionsProvider.transactions[2].coin = this.coins[2];
    TransactionsProvider.transactions[3].date = (new Date(this.now.getTime() - this.HOUR * 5.1)).getTime();
    TransactionsProvider.transactions[3].coin = this.coins[3];
    TransactionsProvider.transactions[4].date = (new Date(this.now.getTime() - this.HOUR * 5.3)).getTime();
    TransactionsProvider.transactions[4].coin = this.coins[4];
  }

  getTransactions(): Transaction[] {
    return TransactionsProvider.transactions;
  }

  add(transaction: Transaction) {
    TransactionsProvider.transactions.push(transaction);
  }
}
