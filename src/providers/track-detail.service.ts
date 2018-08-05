
import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrackDetailService {
    static END_POINT = '/trackDetail';

  constructor(private httpService: HttpService) {

  }
  findByIdTrack(code: String): Observable<any> {
    return this.httpService.get(TrackDetailService.END_POINT + '/' + code);
  }
  findById(id: String): Observable<any> {
    return this.httpService.get(TrackDetailService.END_POINT + '/id/' + id);
  }
}