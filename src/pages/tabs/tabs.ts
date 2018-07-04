import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  constructor(public nav:NavController) {
    console.log("estamos en tab");
    this.nav.setRoot(HomePage);
  }
}
