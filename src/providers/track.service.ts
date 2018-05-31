import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '../models/location.model';
import { Track } from '../models/track.model';

@Injectable()
export class TrackService {
    trackList: Track[];
    location:Location;
    constructor() {
    }
    

    add(location){
        this.trackList.push({
            'idTrack':location.idTrack,
            'location': location
        })
    }



}