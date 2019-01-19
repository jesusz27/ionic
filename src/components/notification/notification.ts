import { Component } from '@angular/core';
import { TrackStorageService } from "../../services/track-storage.service";
import { NavController } from 'ionic-angular';
import { ContactsDangerPage } from "../../pages/contacts-danger/contacts-danger"

@Component({
  selector: 'notification',
  templateUrl: 'notification.html'
})
export class NotificationComponent {

  countTrack: number = 0;

  constructor(private trackStorageService: TrackStorageService, private navCtrl: NavController) {
    this.trackStorageService.getObservableTrack().subscribe(
      data => this.countTrack = data.length
    )
  }
  notification(){
    this.navCtrl.push(ContactsDangerPage)
  }

}
