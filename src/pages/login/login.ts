import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { AuthService } from '../../providers/auth.service'
import { UserStorageService } from '../../providers/user-storage.service'
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    credentials: User = {  idUser: '', password: '' };
    constructor( private nav: NavController, public authService: AuthService, public userStorageService:UserStorageService) { 
    }


    login() {
        this.authService.logIn(this.credentials).subscribe(
            data =>{
                const user:User = data;
                this.userStorageService.setIdUser(user.idUser);
                console.log("login");
                console.log(data);
                this.nav.setRoot(HomePage)
                // window.location.reload();
            },
            error => console.log(error),
        );
    }

    showRegister() {
        this.nav.push(RegisterPage);
    }



}
