
import { Injectable } from '@angular/core';
import { Position } from '../../models/position.model';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Polyline,
  LatLng
} from '@ionic-native/google-maps';

@Injectable()
export class MapProvider {
  map: GoogleMap;
  listPolyline: any[]= [];
  constructor(private googleMaps: GoogleMaps) {
    console.log('Hello MapProvider Provider');

  }

  public loadMap(idDiv) {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 28.635308,
          lng:  77.22496
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create(idDiv, mapOptions);

  }

  public drawPolyline(position : Position) {
    this.addPolyline(position);
    let polylineOptions = {
      points: this.listPolyline,
      'color': '# 0032e9',
      'width': 8,
      'geodesic': true,
    };
    this.map.addPolyline(polylineOptions).then((polyline: Polyline) => {
    });
  }
  
  private addPolyline(position : Position):void{
    let latLng=new LatLng(position.latitude,position.longitude);
    this.centerMap(latLng);
    this.listPolyline.push(latLng);
  }
  private centerMap(coors: LatLng){
    // create CameraPosition
    let camaraPosition: CameraPosition<LatLng> = {
     target: coors,
     zoom: 18,
     tilt: 30
   };
 
   this.map.moveCamera(camaraPosition)

  }
}
