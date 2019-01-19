
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service'
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Injectable()
export class UserService {
  static END_POINT = '/users';

  constructor(private httpService: HttpService) {
  }

  readOne(code: String): Observable<any> {
    return this.httpService.authToken().get(UserService.END_POINT + '/' + code);
  }

  findAll(): Observable<any>{
    return this.httpService.authToken().get(UserService.END_POINT);
  }

  updateIdNotification(user): Observable<any> {
    return this.httpService.authToken().patch(UserService.END_POINT + '/idnotification/', user);
  }
  
  updatePassword(user): Observable<any> {
    return this.httpService.authToken().patch(UserService.END_POINT + '/password/', user);
  }
}
