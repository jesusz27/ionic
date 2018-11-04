import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { TrackSentPage } from '../track-sent/track-sent';
import { TrackReceivedPage } from '../track-received/track-received';
import { ContactPage } from '../contact/contact';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  private data: any;
  tab2Root = TrackSentPage;
  tab3Root = TrackReceivedPage;
  constructor(public nav:NavController,public viewCtrl: ViewController) {
    this.data = {
      viewCtrl: this.viewCtrl
    }
  }
}
