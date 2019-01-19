import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/services-rest/person.service';
import { UserStorageService } from '../../services/user-storage.service';
import { Strings } from "../../utils/strings";
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html'
})

export class PerfilPage {
    toogle: boolean = true;
    person: Person = { _id: 0, firstName: '', lastName: '', birthdate: new Date('2020-10-31'), phone: 0 };
    constructor(public navCtr: NavController, public personService: PersonService, public userStorageService: UserStorageService, public toastService: ToastService) {
        this.userStorageService.getIdUser().then(
            (idUser) => {
                this.personService.findByIdUser(idUser).subscribe(
                    (data) => {
                        this.person = data;
                        this.toogle = false;
                    }
                )
            }
        )
    }

    save() {
        this.userStorageService.getIdUser().then(
            (idUser) => {
                this.personService.create(idUser, this.person).subscribe(
                    data => {
                        this.person = data;
                        this.toogle = false;
                        this.toastService.presentToast(Strings.OPERACION_EXITOSA);
                    }
                )
            }
        )
    }

    update() {
        this.userStorageService.getIdUser().then(
            (idUser) => {
                this.personService.update(idUser, this.person).subscribe(
                    data => this.toastService.presentToast(Strings.MODIFICADO_CORRECTAMENTE)
                )
            }
        )
    }
}
