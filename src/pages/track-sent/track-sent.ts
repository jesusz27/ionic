import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrackService } from '../../providers/track.service'
import { UserStorageService } from '../../providers/user-storage.service';
import { Track } from '../../models/track.model';
import { TrackDetailPage } from '../track-detail/track-detail'
@Component({
 selector: 'page-track-sent',
  templateUrl: 'track-sent.html'
})
export class TrackSentPage {
  private listTracker: Track;
  constructor(public nav:NavController, public trackService:TrackService, public  userStorageService:UserStorageService) {
    this.userStorageService.getIdUser().then(
        (idUser) =>{
            this.trackService.findByCodUser(idUser).subscribe(
                data =>{
                    this.listTracker = data;
                } 
            )
        }
    )
    
  }
  showTrack(track: Track){
    this.nav.push(TrackDetailPage, { param: track.trackDetail });
  }

}
