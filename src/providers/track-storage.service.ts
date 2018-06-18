import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '../models/location.model';
import { Track } from '../models/track.model';
import { TrackStorage } from '../models/trackStorage.model';
@Injectable()
export class TrackStorageService {
    trackStorageList: TrackStorage[] = [];
    location: Location;
    constructor() {

    }
    add(location: Location) {
        const exist = this.search(location.idTrack);
        if (exist) {
            this.trackStorageList[0].location.push(location)
        } else {
            this.trackStorageList.push({
                'idTrack': location.idTrack,
                'location': [location]
            })
        }

    }
    private search(idTrack: string) {
        let exist = undefined;
        for (let i = 0; i < this.trackStorageList.length; i++) {
            if (this.trackStorageList[i].idTrack == idTrack) {
                exist = 1
            }
        }
        return exist;
    }
    searchTrackDB() {

    }

}