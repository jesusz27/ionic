import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import {LocationTrackerProvider} from "../../providers/location-tracker/location-tracker";
import { Socket} from 'ng-socket-io';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lati: any;
  long: any;
  i : any;
  constructor(
    public navCtrl: NavController,
     public geolocation: Geolocation,
     private backgroundGeolocation: BackgroundGeolocation,
     public locationTracker: LocationTrackerProvider,
     public socket: Socket) {
    this.i=0;
    }
    public start() {
      this.locationTracker.startTracking();
    }
  
    public stop() {
      this.locationTracker.stopTracking();
    }
    ionViewDidLoad(){
      this.socket.connect();
     /* let watch = this.geolocation.watchPosition();
      //setInterval(function(){ console.log("hola bb") }, 3000);
      watch.subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
      // this.lati=data.coords.latitude + '--' + this.i++;
       //this.long=data.coords.longitude + '--' + this.i++;
       console.log(data);
      });
    /*  this.geolocation.getCurrentPosition().then((resp) => {
        this.lati=resp.coords.latitude;
        this.long=resp.coords.longitude;
        console.log("hola bb"+this.lati);
       }).catch((error) => {
         console.log('Error getting location', error);
       });*/

    /*   const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 50,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };
      this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log(location);
        this.lati=location.latitude;
        this.long=location.longitude;
      });

      // start recording location
      this.backgroundGeolocation.start();*/

    }
}
