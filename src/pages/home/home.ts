import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from "./home.service";
import { SocketService } from "../../providers/socket.service";
import { User } from '../../models/user.model';
import { Location } from '../../models/location.model';
import { OneSignalService } from '../../providers/one-signal.service';
import { ContactsDangerPage } from "../contacts-danger/contacts-danger"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  status: boolean = true;
  location: Location;
  suscriber: any;
  constructor(
    public navCtrl: NavController,
    public oneSignalService:OneSignalService,
    public homeService: HomeService,
    public socketService: SocketService,
  ) {
    this.socketService.initialize();
    this.oneSignalService.getNoticationObservable().subscribe(
      data => {
        this.navCtrl.push(ContactsDangerPage);
      }
    )
    /*this.suscriber = this.socketService.getTrackHelp().subscribe( // Observador
      data => {
        this.location = JSON.parse(data);
        console.log(this.location);
        locationTrackerService.drawPolyline(this.location);

      },
      error => alert('Observer1, error code: ' + error)
    );*/
  }
  startStop() {
    if (this.status) {
      this.homeService.startTracking();
    } else {
      this.homeService.stopTracking();
    }
    this.status = !this.status;
  }

  ionViewDidLoad() {
    this.homeService.loadMap('map_canvas');
  }


}
