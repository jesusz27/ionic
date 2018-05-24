import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation, BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Socket} from 'ng-socket-io';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;


  constructor(
    public zone: NgZone,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation,
    public socket: Socket
  ) {

  }

  public startTracking() {
    //setInterval(function(){ console.log("hola bb") }, 3000);

    let config : BackgroundGeolocationConfig = {
      desiredAccuracy: 50,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      this.socket.emit('probar','no te mueras -- background'+ location.latitude);
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, (err) => {
      console.log(err);
      });

    this.backgroundGeolocation.start();

    // Background tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      console.log(position);
      this.socket.emit('probar','no te mueras -- foreground'+ position.coords.latitude);
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });
  }

  public stopTracking() {
    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}