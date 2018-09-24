import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Conversation } from './conversation';
import { Autoresize } from './autoresize';

@NgModule({
  declarations: [
    Conversation,
    Autoresize,
  ],
  imports: [
    IonicPageModule.forChild(Conversation),
  ],
  exports: [
    Conversation
  ]
})
export class ConversationModule {}
