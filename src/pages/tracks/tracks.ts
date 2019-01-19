import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { TracksSentPage } from './tracks-sent/tracks-sent';
import { TracksReceivedPage } from './tracks-received/tracks-received';

@Component({
  templateUrl: 'tracks.html'
})

export class TracksPage {
  private data: any;
  tab2Root = TracksSentPage;
  tab3Root = TracksReceivedPage;

  constructor(public nav: NavController, public viewCtrl: ViewController) {
    this.data = {
      viewCtrl: this.viewCtrl
    }
  }
}
