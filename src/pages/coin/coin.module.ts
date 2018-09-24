import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinPage } from './coin';
import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';

import { WalletsProvider } from '../../providers/wallets/wallets';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    CoinPage,
  ],
  imports: [
    NgxChartsModule,
    IonicPageModule.forChild(CoinPage),
  ],
  providers: [
    CoinMarketProvider,
    WalletsProvider
  ]
})
export class CoinPageModule {}
