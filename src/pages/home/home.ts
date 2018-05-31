import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTrackerService } from "../../providers/location-tracker";
import { SocketService } from "../../providers/socket.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  status: boolean = true;
  constructor(
    public navCtrl: NavController,
    public locationTrackerService: LocationTrackerService,
    public socketService: SocketService,
  ) {
    /*   this.socketService.getHelpLocation().subscribe( // Observador
         data => console.log("on emiter socket:" + data),
         error => alert('Observer1, error code: ' + error)
     );*/
  }

  startStop() {
    if (this.status) {
      this.locationTrackerService.startTracking();
    } else {
      this.locationTrackerService.stopTracking();
    }
    this.status = !this.status;
  }

  ionViewDidLoad() {
    this.locationTrackerService.loadMap('map_canvas');
  }

}
