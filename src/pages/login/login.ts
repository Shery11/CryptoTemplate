import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    trigger('flyInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)'
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(0, 150%, 0)'
        })
      ),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out'))
    ]),
  ]
})
export class LoginPage {
  flyInOutState: string = 'out';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    let logo = document.getElementById('logo');
    logo.classList.add('rotate');
    setTimeout(() => {
      this.flyInOutState = 'in';
    }, 1000);
    setTimeout(() => {
      let logo = document.getElementById('logo');
      logo.classList.remove('rotate');
    }, 2000);
  }

  login() {
    this.navCtrl.setRoot(HomePage);
  }
}
