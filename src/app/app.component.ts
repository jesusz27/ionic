import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { PerfilPage} from '../pages/perfil/perfil';
import { ConfigPage } from '../pages/config/config';
import { LoginPage } from '../pages/login/login';

import { UserStorageService } from '../providers/user-storage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public userStorageService: UserStorageService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Contactos', component: ContactPage, icon: 'contacts' },
      { title: 'Recorrios', component: TabsPage, icon: 'md-send' },
      { title: 'Perfil', component: PerfilPage, icon: 'contact' },
      { title: 'Ajustes', component: ConfigPage, icon: 'md-settings' }
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
    this.nav.push(page.component);
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
