import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service'
import { Person } from '../models/person.model';
@Injectable()
export class PersonService {
    static END_POINT = '/person';

    constructor(private httpService: HttpService) {
    }
    create(idUser: string, person: Person): Observable<any>{
        return this.httpService.post(PersonService.END_POINT + '/' + idUser, person);
    }
    update(person: Person): Observable<any> {
        return this.httpService.put(PersonService.END_POINT, person);
    }
    findByIdUser(idUser: string){
        return this.httpService.get(PersonService.END_POINT + '/' + idUser);
    }
}