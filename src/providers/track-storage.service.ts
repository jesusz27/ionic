import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '../models/location.model';
import { Track } from '../models/track.model';
import { TrackStorage } from '../models/trackStorage.model';
import { TrackDetailCrud } from './track-detail-crud.service';
import { UserCrud } from './user-crud.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrackStorageService {
    trackStorageList: TrackStorage[] = [];
    private observableTrackDetail: Subject<TrackStorage[]> = new Subject();
    private observableTrack: Subject<TrackStorage[]> = new Subject();
    constructor(private trackDetailCrud: TrackDetailCrud, private userCrud: UserCrud) {
    }
    public add(data: string) {
        const location: Location = JSON.parse(data);
        const exist = this.search(location.idTrack);
        if (exist!=undefined) {
            this.trackStorageList[exist].location.push(location)
            this.observableTrackDetail.next(this.trackStorageList);
        } else {
            this.searchTrackDB(location.idTrack, location.idUser);
        }

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
    private searchTrackDB(idTrack: string, idUser: string) {
        return this.trackDetailCrud.readOne(idTrack).subscribe(
            data => {
                const locations: Location[] = JSON.parse(data.locationStorage);
                const exist = this.search(idTrack);
                if (exist==undefined) {
                    this.trackStorageList.push({
                        'idTrack': data.idTrack,
                        'location': locations,
                        'idUser': idUser
                    })
                    this.observableTrack.next(this.trackStorageList);    
                }
            }
        );
    }
     getObservableTrack(): Observable<TrackStorage[]>{
        return this.observableTrack.asObservable();
     }
     getObservableTrackDetail(): Observable<TrackStorage[]>{
        return this.observableTrackDetail.asObservable();
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