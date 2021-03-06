
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocationTrackerService } from "../../services/location-tracker"
import { Socket } from 'ng-socket-io';
import { MapService } from "../../services/map.service";
import { UserStorageService } from "../../services/user-storage.service"
import { Location } from '../../models/location.model';

@Injectable()
export class HomeService {
    private idTrack: string = '';
    private subscribe: any;
    private listLocation: Location[];
    private idUser: string;
    constructor(public locationTrackerService: LocationTrackerService, public socket: Socket, public mapService: MapService, public userStorageService: UserStorageService) {
        this.userStorageService.getIdUser().then(
            idUser => this.idUser = idUser
        )
    }

    public startTracking() {
        this.mapService.clear();
        this.idTrack = this.idTrackrand();
        this.locationTrackerService.initialize();
        this.listLocation = [];
        let i: number = 1;

        this.subscribe = this.locationTrackerService.getLocationObservable().subscribe(
            data => {
                if (this.idUser) {
                    const location: Location = data;
                    location.idUser = this.idUser;
                    location.idTrack = this.idTrack;
                    this.socket.emit('startSendingAlerts', JSON.stringify(location), (response) => {
                        console.log("response: " + response);
                    });
                    if (i == 1) { this.mapService.addMarker(location, 0); i++; }
                    this.listLocation.push(location);
                    this.mapService.drawAllPolyline(this.listLocation);
                }
            }
        )

    }

    restartMarker() {
        this.mapService.addMarker(this.listLocation[0], 0);
    }

    private idTrackrand(): string {
        const chars = "0123456789abcdefABCDEF";
        const lon = 20;
        let code = "";
        for (let x = 0; x < lon; x++) {
            const rand = Math.floor(Math.random() * chars.length);
            code += chars.substr(rand, 1);
        }
        return code;
    }

    public stopTracking() {
        this.mapService.addMarker(this.listLocation[this.listLocation.length-1], 1);
        this.reset();
        this.subscribe.unsubscribe();
        this.locationTrackerService.end();
    }

    private reset() {
        this.idTrack = '';
    }

    public loadMap(idDiv) {
        this.mapService.loadMap(idDiv);
    }
}
