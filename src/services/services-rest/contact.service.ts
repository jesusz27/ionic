import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service'
import { Contact } from '../../models/contact.model';

@Injectable()
export class ContactService {
    static END_POINT = '/contacts';
    
    constructor(public httpService: HttpService) {
    }

    findByCodUser(idUser: string): Observable<any> {
        return this.httpService.authToken().get(ContactService.END_POINT + '/' + idUser);
    }

    create(contact: Contact): Observable<any> {
        return this.httpService.authToken().post(ContactService.END_POINT, contact);
    }

    update(id: string, status: string): Observable<any> {
        return this.httpService.authToken().put(ContactService.END_POINT + '/' + id + '/status/' + status);
    }

    delete(id: string): Observable<any> {
        return this.httpService.authToken().delete(ContactService.END_POINT + '/' + id);
    }
}