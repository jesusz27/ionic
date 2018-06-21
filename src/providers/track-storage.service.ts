import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '../models/location.model';
import { Track } from '../models/track.model';
import { TrackStorage } from '../models/trackStorage.model';
import { TrackDetailCrud } from './track-detail-crud.service';
import { UserCrud } from './user-crud.service';

@Injectable()
export class TrackStorageService {
    trackStorageList: TrackStorage[] = [{idTrack:'default'}];
    constructor(private trackDetailCrud:TrackDetailCrud, private userCrud:UserCrud) {
    }
    add(data: string) {
        const location: Location = JSON.parse(data);
        const exist = this.search(location.idTrack);
        if (exist) {
            this.trackStorageList[exist].location.push(location)
        } else {
           this.searchTrackDB(location.idTrack,location.idUser);
        }
        console.log("Add TrackSTorage");
        console.log(this.trackStorageList);

    }
    private search(idTrack: string) {
        let exist = undefined;
        for (let i = 0; i < this.trackStorageList.length; i++) {
            if (this.trackStorageList[i].idTrack == idTrack) {
                exist = i;
            }
        }
        return exist;
    }
    private searchTrackDB(idTrack: string,idUser: string) {
        return this.trackDetailCrud.readOne(idTrack).subscribe(
          data => {
              const locations: Location[]= JSON.parse(data.locationStorage);
              const exist = this.search(idTrack);
              if(!exist){
                  console.log("EXISTE");
                  console.log(exist);
                this.trackStorageList.push({
                    'idTrack': data.idTrack,
                    'location': locations,
                    'idUser' : idUser
                })
              }
          }
        );
      }
   /* private searchUser(idUser:string){
        return this.userCrud.readOne(idUser).subscribe(
            data => {
                const locations: Location[]= JSON.parse(data.locationStorage);
                const exist = this.search(code);
                if(!exist){
                    console.log("EXISTE");
                    console.log(exist);
                  this.trackStorageList.push({
                      'idTrack': data.idTrack,
                      'location': locations
                  })
                }
            }
          );
    }
    */
}