import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model'
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/services-rest/auth.service'
import { Strings } from "../../utils/strings";
import { ToastService } from '../../services/toast.service';
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    credentials: User = { idUser: '', password: '', email: '' };
    constructor(private nav: NavController, public authService: AuthService, private toastService: ToastService) {
    }
    register() {
        this.authService.singUp(this.credentials).subscribe(
            (data) => {
                this.toastService.presentToast(Strings.OPERACION_EXITOSA);
                setTimeout(() => this.nav.setRoot(LoginPage), 2000);
            }
        )

    }
    showLogin() {
        this.nav.setRoot(LoginPage);
    }


}
