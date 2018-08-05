import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserStorageService {
    public idUser: string;
    constructor(public storage: Storage) {

    }
    setIdUser(idUser: string) {
        this.storage.set('idUser', idUser);
        console.log("ingreso user storage");
        this.idUser = idUser;
    }

    getIdUser(): Promise<string> {
        return this.storage.get('idUser')
            .then((idUser) => {
                return idUser;
            });
    }

    removeIdUser() {
        this.storage.clear();

    }


}