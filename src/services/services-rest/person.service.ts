import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service'
import { Person } from '../../models/person.model';

@Injectable()
export class PersonService {
    static END_POINT = '/persons';

    constructor(public httpService: HttpService) {
    }

    create(idUser: string, person: Person): Observable<any>{
        return this.httpService.authToken().post(PersonService.END_POINT + '/' + idUser, person);
    }

    update(idUser: string, person: Person): Observable<any> {
        return this.httpService.authToken().put(PersonService.END_POINT + '/' + idUser, person);
    }

    findByIdUser(idUser: string){
        return this.httpService.authToken().get(PersonService.END_POINT + '/' + idUser);
    }
}