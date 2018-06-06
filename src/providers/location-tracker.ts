import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Socket } from 'ng-socket-io';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Location } from '../models/location.model';
import { MapService } from "../providers/map.service";

@Injectable()
export class LocationTrackerService {

  public watch: any;
  public location: Location;

  constructor(
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation,
    public socket: Socket,
    public mapService: MapService
  ) {

  }

  public startTracking() {
    this.backgroundLocation();
    this.foregroundLocation();
  }

  public stopTracking() {
    this.mapService.clear();
    this.backgroundGeolocation.stop();
    this.watch.unsubscribe();
  }

  public backgroundLocation() {
    let config = this.config();

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      //this.socket.emit('probar','no te mueras -- background'+ location.latitude);
      console.log('BackgroundGeolocation:  ' + JSON.stringify(location));
      //this.position=location
      // this.mapService.drawPolyline(this.location);
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
      // this.position.time=position.timestamp;
      // this.listPosition.push(this.position);
      this.location = location;
      this.socket.emit('probar', JSON.stringify(this.location));
      this.drawPolyline(this.location);
    });
  }
  public config() {
    let config: BackgroundGeolocationConfig = {
      desiredAccuracy: 50,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };
    return config;
  }
  public loadMap(idDiv) {
    this.mapService.loadMap(idDiv);
  }
  public drawPolyline(location: Location) {
    this.mapService.drawPolyline(location);
  }

}