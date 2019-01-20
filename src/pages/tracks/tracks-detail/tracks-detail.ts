import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrackDetailService } from '../../../services/services-rest/track-detail.service';
import { Track } from '../../../models/track.model';
import { MapService } from "../../../services/map.service";
import { Location } from "../../../models/location.model";

@Component({
    selector: 'page-tracks-detail',
    templateUrl: 'tracks-detail.html'
})

export class TracksDetailPage {
    private listTracker: Track;
    private subscriber: any;
    constructor(public nav: NavController, public navParams: NavParams, public trackDetailService: TrackDetailService, public mapService: MapService) {
        const idTrackDetail = this.navParams.get("param");
        this.subscriber = this.trackDetailService.findById(idTrackDetail).subscribe(
            data => {
                const location: Location[] = JSON.parse(data.locationStorage);
                this.mapService.addMarker(location[0], 0);
                this.mapService.drawAllPolyline(location);
                this.mapService.addMarker(location[location.length-1], 1);
            }
        )
    }

    ionViewDidLoad() {
        this.mapService.loadMap('map_canvas2');
    }
    
    ngOnDestroy() {
        this.subscriber.unsubscribe();
    }
}
