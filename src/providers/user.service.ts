
import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service'
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  static END_POINT = '/user';

  constructor(private httpService: HttpService) {

  }
  readOne(code: String): Observable<any> {
    return this.httpService.get(UserService.END_POINT + '/' + code);
  }
  findAll(): Observable<any>{
    return this.httpService.get(UserService.END_POINT);
  }
}
