import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserStorageService {
    public idUser: string;
    public avatar: string;
    constructor(public storage: Storage) {
    }

    setIdUser(idUser: string) {
        this.storage.set('idUser', idUser);
        this.idUser = idUser;
    }

    getIdUser(): Promise<string> {
        return this.storage.get('idUser')
            .then((idUser) => {
                return idUser;
            });
    }

    setAvatar(avatar: string) {
        this.avatar = avatar;
    }

    getAvatar(): string {
        return this.avatar;
    }
    
    removeIdUser() {
        this.storage.clear();
    }
}