import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { TrackService } from '../../../services/services-rest/track.service'
import { UserStorageService } from '../../../services/user-storage.service';
import { Track } from '../../../models/track.model';
import { TracksDetailPage } from '../tracks-detail/tracks-detail'
@Component({
 selector: 'page-tracks-received',
  templateUrl: 'tracks-received.html'
})
export class TracksReceivedPage {
  private listTrack: Track;
  constructor(public nav:NavController, public trackService:TrackService, public  userStorageService:UserStorageService, public viewCtrl: ViewController,public navParams: NavParams) {
    this.viewCtrl = this.navParams.get('viewCtrl');
    this.userStorageService.getIdUser().then(
        (idUser) =>{
            this.trackService.findByCodContact(idUser).subscribe(
                data =>{
                    this.listTrack = data;
                    console.log(this.listTrack);
                } 
            )
        }
    )
    
  }
  showTrack(track: Track){
    this.nav.push(TracksDetailPage, { param: track.trackDetail });
  }
  public onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
