import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CongratulationPage } from './congratulation';

@NgModule({
  declarations: [
    CongratulationPage,
  ],
  imports: [
    IonicPageModule.forChild(CongratulationPage),
  ],
})
export class CongratulationPageModule {}
