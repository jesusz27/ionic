import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model'
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth.service'
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    credentials: User = {  idUser: '', password: '', email: '' };
    constructor( private nav: NavController, public authService:AuthService) { 
    }
    register(){
        this.authService.singUp(this.credentials).subscribe(
            data => {
                console.log("registrado correctamente");
                console.log(data);
                this.nav.setRoot(LoginPage);
            },
            error => {}
        )

    }
    showLogin(){
        this.nav.setRoot(LoginPage);
    }


}
