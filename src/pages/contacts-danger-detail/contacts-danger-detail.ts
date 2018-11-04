import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrackStorage } from '../../models/trackStorage.model';
import { TrackStorageService } from '../../providers/track-storage.service';
import { MapService } from "../../providers/map.service";
import { Subject } from 'rxjs/Subject';
/**
 * Generated class for the ContactsDangerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  // observable: Subject<TrackStorage> = new Subject();

  constructor(public navCtrl: NavController, public navParams: NavParams, public trackStorageService: TrackStorageService, public mapService: MapService) {
    this.idTracks = this.navParams.get("param");
    console.log("hol soy contact danger detail");
    this.change=0;
    this.suscriber = this.trackStorageService.getObservableTrackDetail().subscribe(
      value => {
        try {
          this.trackStorageList = value;
          console.log("imprimiendo this" + this.idTracks);
          this.procesar();
        }
        catch (e) {
          console.log(e);
        }

      },
      error => console.log("error" + error),
      () => console.log("termino")
    );
  }
  procesar() {
    console.log("procesando-**********************************");
    let j = 1;
    for (let i = 0; i < this.trackStorageList.length; i++) {
      if (this.trackStorageList[i].idTrack == this.idTracks) {
        console.log("esta entrando cada rato " + this.idTracks);
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
