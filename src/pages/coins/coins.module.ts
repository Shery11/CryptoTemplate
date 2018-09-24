import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinsPage } from './coins';
import { CoinMarketProvider } from '../../providers/coinmarket/coinmarket';

@NgModule({
  declarations: [
    CoinsPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinsPage),
  ],
  providers: [
    CoinMarketProvider
  ]
})
export class CoinsPageModule {}
