import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Location } from '../models/location.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocationTrackerService {
  watch: any;
  location: Location;
  locationObservable: Subject<Location> = new Subject();

  constructor(public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation) {
  }

  public initialize() {
    this.backgroundLocation();
    this.foregroundLocation();
  }

  public end() {
    this.backgroundGeolocation.stop();
    this.watch.unsubscribe();
  }

  public backgroundLocation() {
    let config = this.config();
    this.backgroundGeolocation.configure(config).subscribe((location) => {
    }, (err) => {
      console.log(err);
    });
    this.backgroundGeolocation.start();
  }

  public foregroundLocation() {
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      const location: Location = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      this.locationObservable.next(location);
    });
  }

  public config() {
    let config: BackgroundGeolocationConfig = {
      desiredAccuracy: 50,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      interval: 2000
    };
    return config;
  }

  getLocationObservable(): Observable<Location> {
    return this.locationObservable.asObservable();
  }
}