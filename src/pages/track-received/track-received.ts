import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { TrackService } from '../../providers/track.service'
import { UserStorageService } from '../../providers/user-storage.service';
import { Track } from '../../models/track.model';
import { TrackDetailPage } from '../track-detail/track-detail'
@Component({
 selector: 'page-track-received',
  templateUrl: 'track-received.html'
})
export class TrackReceivedPage {
  private listTrack: Track;
  constructor(public nav:NavController, public trackService:TrackService, public  userStorageService:UserStorageService, public viewCtrl: ViewController,public navParams: NavParams) {
    this.viewCtrl = this.navParams.get('viewCtrl');
    this.userStorageService.getIdUser().then(
        (idUser) =>{
            this.trackService.findByCodContact(idUser).subscribe(
                data =>{
                    this.listTrack = data;
                } 
            )
        }
    )
    
  }
  showTrack(track: Track){
    this.nav.push(TrackDetailPage, { param: track.trackDetail });
  }
  public onClickCancel() {
    this.viewCtrl.dismiss();
  }
}
