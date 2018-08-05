import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ContactsDangerPage } from '../pages/contacts-danger/contacts-danger';
import { ContactPage } from '../pages/contact/contact';
import { UserStorageService } from '../providers/user-storage.service';
import { ContactsDangerDetailPage } from '../pages/contacts-danger-detail/contacts-danger-detail';
import { TrackSentPage } from '../pages/track-sent/track-sent';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public userStorageService: UserStorageService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Home', component: HomePage },
      { title: 'Contac', component: ContactPage },
      { title: 'ContactsDangerPage', component: ContactsDangerPage },
      { title: 'ContactsDangerDetailPage', component: ContactsDangerDetailPage },
      { title: 'TrackPage', component: TrackSentPage },
      { title: 'Tabs', component: TabsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.homePageRedirect();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  homePageRedirect() {
    this.userStorageService.getIdUser().then(
      data => {
        if (data != undefined) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });
  }
  logout(){
    this.userStorageService.removeIdUser();
    window.location.reload(); // reiniciar socket
  }
}
