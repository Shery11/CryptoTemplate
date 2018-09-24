import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendcoinPage } from './sendcoin';

import { WalletsProvider } from '../../providers/wallets/wallets';
import { TransactionsProvider } from '../../providers/transactions/transactions';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    SendcoinPage,
  ],
  imports: [
    IonicPageModule.forChild(SendcoinPage),
  ],
  providers: [
    WalletsProvider,
    TransactionsProvider,
    BarcodeScanner,
  ]
})
export class SendcoinPageModule { }
