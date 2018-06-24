import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocketService } from "../../providers/socket.service";
import { TrackStorageService } from "../../providers/track-storage.service";
import { TrackStorage } from "../../models/trackStorage.model"
import { ContactsDangerDetailPage } from '../contacts-danger-detail/contacts-danger-detail';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  trackStorageList: TrackStorage[];
  constructor(public nav: NavController, public socketService: SocketService, public trackStorageService: TrackStorageService) {
    console.log("hol soy about");
    console.log(this.trackStorageService.trackStorageList);
    this.trackStorageList=this.trackStorageService.trackStorageList;
    this.trackStorageService.getObservableTrack().subscribe(
      value => {
        this.trackStorageList = value;
        console.log("en about**********-------------------");
        console.log(this.trackStorageList);
      },
      error => console.log("error" + error),
      () => console.log("termino")
    );
  }
  openPage(idTrack) {
    this.nav.push(ContactsDangerDetailPage, { param: idTrack });
  }



}
