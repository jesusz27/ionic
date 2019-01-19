
import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';
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
export class MapService {
  map: GoogleMap;
  
  constructor(private googleMaps: GoogleMaps) {
  }

  public loadMap(idDiv) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 28.635308,
          lng: 77.22496
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create(idDiv, mapOptions);
  }

  public addMarker(location: Location) {
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      position: this.toLatLng(location),
    });
  }

  public drawAllPolyline(location: Location[]) {
    const listPolyline: any[] = [];
    for (let i = 0; i < location.length; i++) {
      listPolyline.push(this.toLatLng(location[i]));
    }
    let polylineOptions = {
      points: listPolyline,
      'color': '#0032e9',
      'width': 8,
      'geodesic': true,
    };
    this.map.addPolyline(polylineOptions).then((polyline: Polyline) => {
    });
    this.centerMap(listPolyline[listPolyline.length - 1]);
  }

  toLatLng(location: Location) {
    return new LatLng(location.latitude, location.longitude);
  }

  private centerMap(coors: LatLng) {
    let camaraPosition: CameraPosition<LatLng> = {
      target: coors,
      zoom: 18,
      tilt: 30
    };
    this.map.moveCamera(camaraPosition)
  }

  clear() {
    this.map.clear();
  }
}
