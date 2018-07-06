import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service'
@Injectable()
export class ContactService {
    static END_POINT = '/contact';
    constructor(public httpService:HttpService) {

    }
    findAll(): Observable<any>{
        return this.httpService.get(ContactService.END_POINT);
    }

}