import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model'
import { LoginPage } from '../login/login';
import { UserCrud} from '../../providers/user-crud.service';
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    credentials: User = {  idUser: '', password: '', email: '' };
    constructor( private nav: NavController, public userCrud:UserCrud) { 
    }
    register(){
        this.userCrud.register(this.credentials).subscribe(
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
