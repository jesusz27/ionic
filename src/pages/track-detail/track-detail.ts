import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrackDetailService } from '../../providers/track-detail.service';
import { Track } from '../../models/track.model';
import { MapService } from "../../providers/map.service";
import { Location } from "../../models/location.model";

@Component({
    selector: 'page-track-detail',
    templateUrl: 'track-detail.html'
})
export class TrackDetailPage {
    private listTracker: Track;
    private subscriber: any;
    constructor(public nav: NavController, public navParams: NavParams, public trackDetailService: TrackDetailService, public mapService: MapService) {
        const idTrackDetail = this.navParams.get("param");
        this.subscriber = this.trackDetailService.findById(idTrackDetail).subscribe(
            data => {
                const location: Location[] = JSON.parse(data.locationStorage);
                this.mapService.drawAllPolyline(location);
            }
        )
    }

    ionViewDidLoad() {
        this.mapService.loadMap('map_canvas');
    }
    ngOnDestroy() {
        this.subscriber.unsubscribe();
    }
}
