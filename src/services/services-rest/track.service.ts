import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service'

@Injectable()
export class TrackService {
    static END_POINT = '/tracks';

    constructor(public httpService: HttpService) {
    }

    findByCodUser(idUser: string): Observable<any> {
        return this.httpService.authToken().get(TrackService.END_POINT + '/user/' + idUser);
    }

    findByCodContact(idUser: string): Observable<any> {
        return this.httpService.authToken().get(TrackService.END_POINT + '/contact/' + idUser);
    }
}