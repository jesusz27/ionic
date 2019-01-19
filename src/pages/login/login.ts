import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/services-rest/auth.service'
import { UserStorageService } from '../../services/user-storage.service'
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    credentials: User = { idUser: '', password: '' };
    constructor(public nav: NavController, public authService: AuthService, public userStorageService: UserStorageService) {
    }

    login() {
        this.authService.logIn(this.credentials).subscribe(
            data => {
                const user: User = data;
                this.userStorageService.setIdUser(user.idUser);
                this.nav.setRoot(HomePage)
            }
        );
    }

    showRegister() {
        this.nav.push(RegisterPage);
    }
}
