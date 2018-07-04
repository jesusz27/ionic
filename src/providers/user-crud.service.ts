
import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service'
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UserCrud {
    static END_POINT = '/user';

  constructor(private httpService: HttpService) {

  }
  readOne(code: String): Observable<any> {
    return this.httpService.get(UserCrud.END_POINT + '/' + code);
  }
  login(user: User): Observable<any>{
    return this.httpService.post(UserCrud.END_POINT + '/login/' , user);
  }
}
