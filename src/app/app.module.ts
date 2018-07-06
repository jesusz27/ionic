import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactsDangerDetailPage } from '../pages/contacts-danger-detail/contacts-danger-detail'
import { HttpService } from '../core/http.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationTrackerService } from '../providers/location-tracker';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapService } from '../providers/map.service';
import { ContactService } from '../providers/contact.service';
import { SocketService } from '../providers/socket.service';
import { TrackService } from '../providers/track.service';
import { TrackStorageService } from '../providers/track-storage.service';
import { TrackDetailCrud } from '../providers/track-detail-crud.service';
import { UserService } from '../providers/user.service';
import { UserStorageService } from '../providers/user-storage.service';
import { AuthService } from '../providers/auth.service'; 
import { RlTagInputModule } from 'angular2-tag-input';

const config: SocketIoConfig = {
  url: 'http://192.168.0.15:9095',
  options: {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax': 5000,
    'reconnectionAttempts': 5,
    'transports': ['websocket', 'polling'],
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    ContactsDangerDetailPage
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    RlTagInputModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    ContactsDangerDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BackgroundGeolocation,
    GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpService,
    LocationTrackerService,
    MapService,
    SocketService,
    TrackService,
    TrackStorageService,
    TrackDetailCrud,
    UserService,
    UserStorageService,
    AuthService,
    ContactService
  ]
})
export class AppModule { }
