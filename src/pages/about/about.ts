import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocketService } from "../../providers/socket.service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public socketService: SocketService) {

  }

}
