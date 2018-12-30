import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsDangerDetailPage } from './contacts-danger-detail';

@NgModule({
  declarations: [
    ContactsDangerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsDangerDetailPage),
  ],
})
export class ContactsDangerDetailPageModule {}
