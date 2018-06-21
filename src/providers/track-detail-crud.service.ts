
import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrackDetailCrud {
    static END_POINT = '/trackDetail';

  constructor(private httpService: HttpService) {

  }
  readOne(code: String): Observable<any> {
    return this.httpService.get(TrackDetailCrud.END_POINT + '/' + code);
}
}
