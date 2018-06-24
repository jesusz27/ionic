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
  trackCurrent:TrackStorage;
  suscriber: any;
  // observable: Subject<TrackStorage> = new Subject();

  constructor(public navCtrl: NavController, public navParams: NavParams, public trackStorageService: TrackStorageService, public mapService:MapService) {
    this.idTracks = this.navParams.get("param");
    console.log("hol soy contact danger detail");
    this.suscriber=this.trackStorageService.getObservableTrackDetail().subscribe(
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
    for (let i = 0; i < this.trackStorageList.length; i++) {
      if (this.trackStorageList[i].idTrack == this.idTracks) {
        console.log("esta entrando cada rato " + this.idTracks);
        this.mapService.drawAllPolyline(this.trackStorageList[i].location);
      }
    }
  }
  ionViewDidLoad() {
    this.mapService.loadMap('map_canvas');
  }
  ngOnDestroy() {
    this.suscriber.unsubscribe();
  }
}
