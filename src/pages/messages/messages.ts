import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  contacts = [
    {
      id: 'U000001',
      first_name: 'Oswald',
      last_name: 'Cobb',
      email: 'oswald@gmail.com',
      phone: '+1234567890',
      avatar: 'assets/imgs/oswald.png',
      status: `I'm the King of Gotham!`
    },
    {
      id: 'U000002',
      first_name: 'Fish',
      last_name: 'Mooney',
      email: 'mooney@gmail.com',
      phone: '+1234567891',
      avatar: 'assets/imgs/fish.png',
      status: `Please don't call me babes`
    },
    {
      id: 'U000003',
      first_name: 'Quang Anh',
      last_name: 'Le',
      email: 'quanganh@aiti.com.vn',
      phone: '+1234567892',
      avatar: 'assets/imgs/profile-anhlq.png',
      status: `I'm a Bitch CEO!`
    },
    {
      id: 'U000004',
      first_name: 'Jeff',
      last_name: 'Dang',
      email: 'jeff.dang@gmail.com',
      phone: '+1234567893',
      avatar: 'assets/imgs/minhdt.png',
      status: `It's Gotham, baby, we've got all flair`
    },
    {
      id: 'U000005',
      first_name: 'David',
      last_name: 'Bui',
      email: 'david.bui@gmail.com',
      phone: '+1234567894',
      avatar: 'assets/imgs/quybt.png',
      status: `No body, no crime`
    },
    {
      id: 'U000006',
      first_name: 'Selina',
      last_name: 'Kyle',
      email: 'selina@gmail.com',
      phone: '+1234567894',
      avatar: 'assets/imgs/selina.png',
      status: `Can got your tongue?`
    },
    {
      id: 'U000007',
      first_name: 'Harvey',
      last_name: 'Bullock',
      email: 'harvey@gmail.com',
      phone: '+1234567896',
      avatar: 'assets/imgs/harvey.png',
      status: `I thought I was supposed to be the bad guy here?`
    },
    {
      id: 'U000008',
      first_name: 'Jim',
      last_name: 'Gordon',
      email: 'gordon@gmail.com',
      phone: '+1234567897',
      avatar: 'assets/imgs/jim.png',
      status: `I'm the King of Gotham!`
    },
    {
      id: 'U000009',
      first_name: 'Le Minh',
      last_name: 'Ha',
      email: 'haleminh27@gmail.com',
      phone: '+1234567898',
      avatar: 'assets/imgs/utre.png',
      status: `I'm the Queen of Gotham!`
    },
    {
      id: 'U000010',
      first_name: 'Ba Hoang',
      last_name: 'Le',
      email: 'lebahoang@gmail.com',
      phone: '+1234567899',
      avatar: 'assets/imgs/anhlq.png',
      status: `I'm the King Nothing!`
    },
    {
      id: 'U000011',
      first_name: 'Barbara',
      last_name: 'Kean',
      email: 'barbara@gmail.com',
      phone: '+1234567893',
      avatar: 'assets/imgs/barbara.png',
      status: `It's Gotham, baby, we've got all flair`
    },
    {
      id: 'U000012',
      first_name: 'Edward',
      last_name: 'Nygma',
      email: 'edward@gmail.com',
      phone: '+1234567894',
      avatar: 'assets/imgs/edward.png',
      status: `No body, no crime`
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  chat(contact) {
    this.navCtrl.push('Conversation', {contact: contact});
  }
}
