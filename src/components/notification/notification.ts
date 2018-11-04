import { Component } from '@angular/core';
import { TrackStorageService } from "../../providers/track-storage.service";
import { NavController } from 'ionic-angular';
import { ContactsDangerPage } from "../../pages/contacts-danger/contacts-danger"

@Component({
  selector: 'notification',
  templateUrl: 'notification.html'
})
export class NotificationComponent {

  countTrack: number = 0;

  constructor(private trackStorageService: TrackStorageService, public navCtrl: NavController) {
    this.trackStorageService.getObservableTrack().subscribe(
      data => this.countTrack = data.length
    )
  }
  notification(){
    console.log("notif");
    this.navCtrl.push(ContactsDangerPage)
  }

}
