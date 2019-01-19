import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocketService } from "../../services/socket.service";
import { TrackStorageService } from "../../services/track-storage.service";
import { TrackStorage } from "../../models/trackStorage.model"
import { ContactsDangerDetailPage } from './contacts-danger-detail/contacts-danger-detail';

@Component({
  selector: 'page-contacts-danger',
  templateUrl: 'contacts-danger.html'
})

export class ContactsDangerPage {
  trackStorageList: TrackStorage[];
  constructor(public nav: NavController, public socketService: SocketService, public trackStorageService: TrackStorageService) {
    this.trackStorageList = this.trackStorageService.trackStorageList;
    this.trackStorageService.getObservableTrack().subscribe(
      value => {
        this.trackStorageList = value;
      }
    );
  }

  openPage(idTrack) {
    this.nav.push(ContactsDangerDetailPage, { param: idTrack });
  }
}
