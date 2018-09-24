import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { CoinMarketProvider } from '../providers/coinmarket/coinmarket';
import { CoinProvider } from '../providers/coin/coin';
import { WalletsProvider } from '../providers/wallets/wallets';
import { TransactionsProvider } from '../providers/transactions/transactions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // ListPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true,
      backButtonText: '',
      menuType: 'overlay',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      platforms: {
        ios: {
          scrollAssist: false,
          autoFocusAssist: false,
          inputBlurring: false,
          statusbarPadding: true,
          tabsHideOnSubPages: true
        },
        android: {
          scrollAssist: false,
          autoFocusAssist: false,
          tabsHideOnSubPages: true
        }
      }
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CoinMarketProvider,
    CoinProvider,
    WalletsProvider,
    TransactionsProvider
  ]
})
export class AppModule {}
