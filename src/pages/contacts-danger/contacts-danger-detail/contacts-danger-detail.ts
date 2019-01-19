import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrackStorage } from '../../../models/trackStorage.model';
import { TrackStorageService } from '../../../services/track-storage.service';
import { MapService } from "../../../services/map.service";
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-contacts-danger-detail',
  templateUrl: 'contacts-danger-detail.html',
})

export class ContactsDangerDetailPage {
  trackStorageList: TrackStorage[];
  idTracks: string;
  trackCurrent: TrackStorage;
  suscriber: any;
  change: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public trackStorageService: TrackStorageService, public mapService: MapService) {
    this.idTracks = this.navParams.get("param");
    this.change = 0;
    this.suscriber = this.trackStorageService.getObservableTrackDetail().subscribe(
      value => {
        try {
          this.trackStorageList = value;
          this.procesar();
        }
        catch (e) {
          console.log(e);
        }
      }
    );
  }

  procesar() {
    let j = 1;
    for (let i = 0; i < this.trackStorageList.length; i++) {
      if (this.trackStorageList[i].idTrack == this.idTracks) {
        if (this.change == 0 || this.change != this.trackStorageList[i].location.length) {
          this.change = this.trackStorageList[i].location.length;
          this.mapService.drawAllPolyline(this.trackStorageList[i].location);
          if (j == 1) { this.mapService.addMarker(this.trackStorageList[i].location[0]); j++; }
        }
      }
    }
  }

  ionViewDidLoad() {
    this.mapService.loadMap('map_canvas3');
  }

  ngOnDestroy() {
    this.suscriber.unsubscribe();
  }
}
