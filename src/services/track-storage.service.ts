import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '../models/location.model';

import { TrackStorage } from '../models/trackStorage.model';
import { TrackDetailService } from './services-rest/track-detail.service';
import { UserService } from './services-rest/user.service';
import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrackStorageService {
    trackStorageList: TrackStorage[] = [];
    private observableTrackDetail: Subject<TrackStorage[]> = new Subject();
    private observableTrack: Subject<TrackStorage[]> = new Subject();

    constructor(private trackDetailService: TrackDetailService, private userService: UserService) {
    }

    public add(data: string) {
        const location: Location = JSON.parse(data);
        const exist = this.search(location.idTrack);
        if (exist != undefined) {
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
        return this.trackDetailService.findByIdTrack(idTrack).subscribe(
            data => {
                const locations: Location[] = JSON.parse(data.locationStorage);
                const exist = this.search(idTrack);
                if (exist == undefined) {
                    this.trackStorageList.push({
                        'idTrack': data.idTrack,
                        'location': locations,
                        'idUser': idUser
                    })
                    this.searchUser(idUser, idTrack);
                    this.observableTrack.next(this.trackStorageList);
                }
            }
        );
    }

    getObservableTrack(): Observable<TrackStorage[]> {
        return this.observableTrack.asObservable();
    }

    getObservableTrackDetail(): Observable<TrackStorage[]> {
        return this.observableTrackDetail.asObservable();
    }

    private searchUser(idUser: string, idTrack: string) {
        return this.userService.readOne(idUser).subscribe(
            data => {
                const user: User = data;
                const exist = this.search(idTrack);
                if (exist != undefined) {
                    this.trackStorageList[exist].avatar = user.avatar;
                }
            }
        );
    }
}