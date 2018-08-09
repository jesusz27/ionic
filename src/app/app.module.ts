import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { ContactsDangerPage } from '../pages/contacts-danger/contacts-danger';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TrackSentPage } from '../pages/track-sent/track-sent';
import { TrackDetailPage } from '../pages/track-detail/track-detail'
import { TrackReceivedPage } from '../pages/track-received/track-received';
import { ContactsDangerDetailPage } from '../pages/contacts-danger-detail/contacts-danger-detail'
import { ConfigPage } from '../pages/config/config';
import { PerfilPage } from '../pages/perfil/perfil';
import { AvatarPage } from '../pages/avatar/avatar'; 
import { HttpService } from '../core/http.service';
import { OneSignal } from '@ionic-native/onesignal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationTrackerService } from '../providers/location-tracker';
import { OneSignalService } from '../providers/one-signal.service';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HomeService } from '../pages/home/home.service';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapService } from '../providers/map.service';
import { ContactService } from '../providers/contact.service';
import { SocketService } from '../providers/socket.service';
import { TrackService } from '../providers/track.service';
import { TrackStorageService } from '../providers/track-storage.service';
import { TrackDetailService } from '../providers/track-detail.service';
import { UserService } from '../providers/user.service';
import { UserStorageService } from '../providers/user-storage.service';
import { AuthService } from '../providers/auth.service'; 
import { PersonService } from '../providers/person.service';
import { NotificationComponent } from '../components/notification/notification'; 
import { RlTagInputModule } from 'angular2-tag-input';
import { Camera } from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
const config: SocketIoConfig = {
  // url: 'http://zea-pfm.herokuapp.com',
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
    ContactsDangerPage,
    ContactPage,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    TrackSentPage,
    TrackDetailPage,
    TrackReceivedPage,
    ContactsDangerDetailPage,
    ConfigPage,
    PerfilPage,
    AvatarPage,
    NotificationComponent
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
    ContactsDangerPage,
    ContactPage,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    TrackSentPage,
    TrackDetailPage,
    TrackReceivedPage,
    ContactsDangerDetailPage,
    ConfigPage,
    PerfilPage,
    AvatarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    OneSignal,
    BackgroundGeolocation,
    GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    FileTransfer,
    File,
    HttpService,
    LocationTrackerService,
    OneSignalService,
    MapService,
    SocketService,
    TrackService,
    TrackStorageService,
    TrackDetailService,
    UserService,
    UserStorageService,
    AuthService,
    PersonService,
    ContactService,
    HomeService
  ]
})
export class AppModule { }
