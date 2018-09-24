import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangePage } from './exchange';

import { WalletsProvider } from '../../providers/wallets/wallets';
import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';
import { TransactionsProvider } from '../../providers/transactions/transactions';

@NgModule({
  declarations: [
    ExchangePage,
  ],
  imports: [
    IonicPageModule.forChild(ExchangePage),
  ],
  providers: [
    WalletsProvider,
    CoinMarketProvider,
    TransactionsProvider
  ]
})
export class ExchangePageModule {}
