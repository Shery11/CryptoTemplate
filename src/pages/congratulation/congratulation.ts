import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CongratulationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-congratulation',
  templateUrl: 'congratulation.html',
})
export class CongratulationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CongratulationPage');
    let logo = document.getElementById('logo');
    logo.classList.add('rotate');
    setTimeout(() => {
      let logo = document.getElementById('logo');
      logo.classList.remove('rotate');
      this.navCtrl.pop();
    }, 2000);
  }

}
