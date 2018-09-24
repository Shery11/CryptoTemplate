import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Autoresize } from './autoresize';
import * as moment from 'moment';

/**
 * Generated class for the Conversation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class Conversation {
  group: any;
  contact: any;
  me: any;
  messages: any[];
  editorMsg: string = '';
  image: any;
  showKeyboard: any;
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  @ViewChild('chat_input') test: Autoresize;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public zone: NgZone, private camera: Camera) {
    this.messages = new Array<any>();
    this.me = {
      id: 'U000003',
      first_name: 'Quang Anh',
      last_name: 'Le',
      email: 'quanganh@aiti.com.vn',
      phone: '+1234567892',
      avatar: 'assets/imgs/profile-anhlq.png',
      status: `I'm a Bitch CEO!`
    };
    if (this.navParams.get('contact')) {
      this.contact = this.navParams.get('contact');

      // populate previous chat
      this.messages.push({
        sender: this.contact,
        content: 'Sea cu modus possim commune. Ea stet dicunt pro. Iusto argumentum disputando mea no',
        position: 'left',
        type: 'text',
        time: new Date()
      });
      this.messages.push({
        sender: this.me,
        content: 'Sea cu modus possim commune. Ea stet dicunt pro.',
        position: 'right',
        type: 'text',
        time: new Date()
      });
      this.messages.push({
        sender: this.me,
        content: 'assets/imgs/fotolia_63761459.jpg',
        base64: 'assets/imgs/fotolia_63761459.jpg',
        position: 'right',
        type: 'image',
        time: new Date()
      });
      this.messages.push({
        sender: this.contact,
        content: 'Ea stet dicunt pro. Iusto argumentum disputando mea no',
        position: 'left',
        type: 'text',
        time: new Date()
      });

    } else if (this.navParams.get('group')) {
      this.group = this.navParams.get('group');
      console.log(this.group);
      // populate previous chat
      this.group.contacts.forEach(contact => {
        this.messages.push({
          sender: contact,
          content: 'Sea cu modus possim commune. Ea stet dicunt pro. Iusto argumentum disputando mea no',
          position: 'left',
          type: 'text',
          time: new Date()
        });
        this.messages.push({
          sender: this.me,
          content: 'Sea cu modus possim commune. Ea stet dicunt pro.',
          position: 'right',
          type: 'text',
          time: new Date()
        });
      });
    }
  }

  contentMouseDown(event) {
    let myInput = document.getElementById('myInput');
    let innerInput: HTMLInputElement = <HTMLInputElement>myInput.children[0];
    innerInput.style.height = '20px';
    innerInput.blur();
  }

  footerTouchStart(event) {
    if (event.target.localName !== "textarea") {
      event.preventDefault();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Conversation');
    this.scrollToBottom();
    setTimeout(() => {
      let myInput = document.getElementById('myInput');
      if (myInput) {
        let innerInput: HTMLInputElement = <HTMLInputElement>myInput.children[0];
        if (innerInput) {
          innerInput.style.height = '20px';
          innerInput.focus();
        }
      }
    }, 1500);
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: 0,
      destinationType: 0,
      allowEdit: true,
      correctOrientation: true,
      targetWidth: 600,
      targetHeight: 300,
      encodingType: 1
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'url(data:image/jpeg;base64,' + imageData + ')';
      this.zone.run(() => {
        this.image = base64Image;
        this.messages.push({
          sender: this.me,
          content: base64Image,
          base64: 'data:image/jpeg;base64,' + imageData,
          position: 'right',
          type: 'image'
        });
        this.scrollToBottom();
      });
    }, (err) => {
      // Handle error
    });
  }

  getCamera() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: 1,
      destinationType: 0,
      allowEdit: true,
      correctOrientation: true,
      targetWidth: 600,
      targetHeight: 300,
      encodingType: 1
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'url(data:image/jpeg;base64,' + imageData + ')';
      this.zone.run(() => {
        this.image = base64Image;
        this.messages.push({
          sender: this.me,
          content: base64Image,
          base64: 'data:image/jpeg;base64,' + imageData,
          position: 'right',
          type: 'image'
        });
        this.scrollToBottom();
      });
    }, (err) => {
      // Handle error
    });
  }

  send($event) {
    $event.preventDefault();
    let myInput = document.getElementById('myInput');
    let innerInput: HTMLInputElement = <HTMLInputElement>myInput.children[0];
    setTimeout(() => {
      innerInput.focus();
    }, 50);
    if (!this.editorMsg.trim()) return;
    if (this.editorMsg !== '') {
      this.messages.push({
        sender: this.me,
        content: this.editorMsg,
        position: 'right',
        type: 'text'
      });

      innerInput.style.height = '20px';
      this.editorMsg = '';
      this.scrollToBottom();

      setTimeout(() => {
        if (this.contact) {
          this.messages.push({
            sender: this.contact,
            content: 'This is an auto answer from system',
            position: 'left',
            type: 'text'
          });
        } else if (this.group) {
          let random = Math.floor(Math.random() * this.group.contacts.length);
          this.messages.push({
            sender: this.group.contacts[random],
            content: 'This is an auto answer from system',
            position: 'left',
            type: 'text'
          });
        }
        this.scrollToBottom();
      }, 600);
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  niceTime(date: Date) {
    return moment(date).fromNow();
  }
}
