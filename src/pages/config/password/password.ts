import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../../models/user.model';
import { UserStorageService } from '../../../services/user-storage.service';
import { UserService } from '../../../services/services-rest/user.service';
import { ToastService } from '../../../services/toast.service';
import { Strings } from "../../../utils/strings";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
@Component({
    selector: 'page-password',
    templateUrl: 'password.html'
})
export class PasswordPage {
    myForm: FormGroup;
    idUser: string;
    constructor(public navCtr: NavController, public userStorageService: UserStorageService, public userService: UserService, private toastService: ToastService, private formBuilder: FormBuilder) {
        this.userStorageService.getIdUser().then(
            (user) => {
                console.log(user);
                this.idUser = user;
            }
        );
        this.myForm = this.createMyForm();
    }
    private createMyForm() {
        return this.formBuilder.group({
            password: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: this.MatchPassword });
    }

    MatchPassword(abstractControl: AbstractControl) {
        let password = abstractControl.get('newPassword').value;
        let confirmPassword = abstractControl.get('confirmPassword').value;
        if (password != confirmPassword) {
            abstractControl.get('confirmPassword').setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }
    update() {
        const user: User = { idUser: this.idUser, password: this.myForm.value.password, newPassword: this.myForm.value.newPassword };
        console.log(this.myForm.value);
        this.userService.updatePassword(user).subscribe(
            data => {
                console.log(data);
                this.toastService.presentToast(Strings.MODIFICADO_CORRECTAMENTE);
            }
        )
    }

}
