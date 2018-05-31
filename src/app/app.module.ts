import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { LocationTrackerService } from '../providers/location-tracker';
import { SocketIoModule,SocketIoConfig} from 'ng-socket-io';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapService } from '../providers/map.service';
import { SocketService } from '../providers/socket.service';
import { TrackService } from '../providers/track.service';
const config :SocketIoConfig = {
  url : 'http://192.168.0.15:9095',
  options :{}
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BackgroundGeolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerService,
    MapService,
    SocketService,
    TrackService
  ]
})
export class AppModule {}
