import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrackSentPage } from '../track-sent/track-sent';
import { TrackReceivedPage } from '../track-received/track-received';
import { ContactPage } from '../contact/contact';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab2Root = TrackSentPage;
  tab3Root = TrackReceivedPage;
  constructor(public nav:NavController) {

  }
}
