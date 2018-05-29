import {Injectable} from '@angular/core';
import {BackgroundGeolocation, BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Socket} from 'ng-socket-io';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Position } from '../../models/position.model';
import { MapProvider } from "../../providers/map/map";

@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public position : Position;

  constructor(
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation,
    public socket: Socket,
    public mapProvider: MapProvider
  ) {

  }

  public startTracking() {
    this.backgroundLocation();
    this.foregroundLocation();
  }

  public stopTracking() {
    this.backgroundGeolocation.stop();
    this.watch.unsubscribe();
  }

  public backgroundLocation(){
    let config=this.config();

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      //this.socket.emit('probar','no te mueras -- background'+ location.latitude);
      console.log('BackgroundGeolocation:  ' + JSON.stringify(location));
      //this.position=location
      this.mapProvider.drawPolyline(this.position);
    }, (err) => {
      console.log(err);
      });

    this.backgroundGeolocation.start();
  }
  public foregroundLocation(){
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      this.position=position.coords;
     // this.position.time=position.timestamp;
     // this.listPosition.push(this.position);
      this.mapProvider.drawPolyline(this.position);
      //this.socket.emit('probar','no te mueras -- foreground'+ position.coords.latitude);

    });
  }
  public config(){
    let config : BackgroundGeolocationConfig = {
      desiredAccuracy: 50,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };
    return config;
  }
  public loadMap(idDiv){
    this.mapProvider.loadMap(idDiv);
  }
}