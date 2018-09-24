import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{ title: string, component: any, icon?: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Market', component: HomePage, icon: `assets/imgs/coinmenu/market.svg` },
      { title: 'Wallets', component: 'WalletsPage', icon: `assets/imgs/coinmenu/wallet.svg` },
      { title: 'Address Book', component: 'ContactsPage', icon: `assets/imgs/coinmenu/address.svg` },
      { title: 'Exchange', component: 'ExchangePage', icon: `assets/imgs/coinmenu/exchange.svg` },
      { title: 'Send', component: 'SendcoinPage', icon: `assets/imgs/coinmenu/send.svg` },
      { title: 'Messages', component: 'MessagesPage', icon: `assets/imgs/coinmenu/messages.svg` },
      { title: 'Settings', component: 'SettingsPage', icon: `assets/imgs/coinmenu/settings.svg` },
      { title: 'Logout', component: null, icon: `assets/imgs/coinmenu/logout.svg` },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title !== 'Logout') {
      this.nav.setRoot(page.component);
    } else {
      // logout
      this.nav.setRoot('LoginPage');
    }
  }
}
