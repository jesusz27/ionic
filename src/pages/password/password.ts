import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { UserStorageService } from '../../providers/user-storage.service';
import { UserService } from '../../providers/user.service';
@Component({
    selector: 'page-password',
    templateUrl: 'password.html'
})
export class PasswordPage {
    idUser: string;
    credentiales = { password: '', newPassword: '', confirmPassword: '' };
    constructor(public navCtr: NavController, public userStorageService: UserStorageService, public userService: UserService) {
        this.userStorageService.getIdUser().then(
            (user) => {
                console.log(user);
                this.idUser = user;
            }
        )
    }
    update() {
        const user:User = { idUser: this.idUser, password:this.credentiales.password, newPassword: this.credentiales.newPassword };
        this.userService.updatePassword(user).subscribe(
            data => console.log(data)
        )
    }

}
