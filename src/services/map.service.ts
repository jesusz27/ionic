
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
  LatLng,
  MarkerIcon
} from '@ionic-native/google-maps';

@Injectable()
export class MapService {
  map: GoogleMap;
  icon: MarkerIcon[];
  constructor(private googleMaps: GoogleMaps) {
    this.icon = [
      { url: './assets/imgs/marcador-a.png', size: { width: 25, height: 40 } },
      { url: './assets/imgs/marcador-b.png', size: { width: 25, height: 40 } },
    ];

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

  public addMarker(location: Location, indexMarker: number) {
    let marker: Marker = this.map.addMarkerSync({
      title: 'Marker',
      icon: this.icon[indexMarker],
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
