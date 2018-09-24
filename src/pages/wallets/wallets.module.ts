import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletsPage } from './wallets';

import { WalletsProvider } from '../../providers/wallets/wallets';
import { TransactionsProvider } from '../../providers/transactions/transactions';

@NgModule({
  declarations: [
    WalletsPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletsPage),
  ],
  providers: [
    WalletsProvider,
    TransactionsProvider
  ]
})
export class WalletsPageModule {}
