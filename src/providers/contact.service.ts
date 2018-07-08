import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service'
import { Contact } from '../models/contact.model';
@Injectable()
export class ContactService {
    static END_POINT = '/contact';
    constructor(public httpService:HttpService) {

    }
    findByCodUser(idUser : string): Observable<any>{
        return this.httpService.get(ContactService.END_POINT + '/' + idUser);
    }
    create(contact: Contact): Observable<any>{
        return this.httpService.post(ContactService.END_POINT, contact);
    }

}