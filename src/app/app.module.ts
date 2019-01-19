import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { ContactsDangerPage } from '../pages/contacts-danger/contacts-danger';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ContactsPage } from '../pages/contacts/contacts';
import { HomePage } from '../pages/home/home';
import { TracksPage } from '../pages/tracks/tracks';
import { TracksSentPage } from '../pages/tracks/tracks-sent/tracks-sent';
import { TracksDetailPage } from '../pages/tracks/tracks-detail/tracks-detail'
import { TracksReceivedPage } from '../pages/tracks/tracks-received/tracks-received';
import { ContactsDangerDetailPage } from '../pages/contacts-danger/contacts-danger-detail/contacts-danger-detail'
import { ConfigPage } from '../pages/config/config';
import { PerfilPage } from '../pages/perfil/perfil';
import { AvatarPage } from '../pages/config/avatar/avatar'; 
import { PasswordPage } from '../pages/config/password/password';
import { HttpService } from '../core/http.service';
import { OneSignal } from '@ionic-native/onesignal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationTrackerService } from '../services/location-tracker';
import { OneSignalService } from '../services/one-signal.service';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HomeService } from '../pages/home/home.service';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapService } from '../services/map.service';
import { ContactService } from '../services/services-rest/contact.service';
import { SocketService } from '../services/socket.service';
import { TrackService } from '../services/services-rest/track.service';
import { TrackStorageService } from '../services/track-storage.service';
import { TrackDetailService } from '../services/services-rest/track-detail.service';
import { UserService } from '../services/services-rest/user.service';
import { UserStorageService } from '../services/user-storage.service';
import { AuthService } from '../services/services-rest/auth.service'; 
import { PersonService } from '../services/services-rest/person.service';
import { ToastService } from '../services/toast.service';
import { NotificationComponent } from '../components/notification/notification'; 
import { RlTagInputModule } from 'angular2-tag-input';
import { Camera } from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DateFormatPipe } from '../pipes/date-format/date-format';
import { UrlAvatarPipe } from '../pipes/url-avatar/url-avatar';
import { Configs } from '../utils/configs';

const config: SocketIoConfig = {
  url: Configs.SERVER,
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
    ContactsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    TracksPage,
    TracksSentPage,
    TracksDetailPage,
    TracksReceivedPage,
    ContactsDangerDetailPage,
    ConfigPage,
    PerfilPage,
    AvatarPage,
    PasswordPage,
    NotificationComponent,
    DateFormatPipe,
    UrlAvatarPipe
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
    ContactsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    TracksPage,
    TracksSentPage,
    TracksDetailPage,
    TracksReceivedPage,
    ContactsDangerDetailPage,
    ConfigPage,
    PerfilPage,
    AvatarPage,
    PasswordPage,
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
    ToastService,
    ContactService,
    HomeService
  ]
})
export class AppModule { }
