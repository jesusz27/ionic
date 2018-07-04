import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { UserCrud } from '../../providers/user-crud.service'
import { UserStorageService } from '../../providers/user-storage.service'
import { HomePage } from '../home/home';
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    credentials: User = {  idUser: '', password: '' };
    constructor( private nav: NavController, public userCrud: UserCrud, public userStorageService:UserStorageService) { 
    }


    login() {
        this.userCrud.login(this.credentials).subscribe(
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

    showLoading() {
        this.nav.setRoot(HomePage)
    }



}
