
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service'
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Injectable()
export class AuthService {
  static END_POINT = '/auth';

  constructor(private httpService: HttpService) {

  }
  logIn(user: User): Observable<any> {
    return this.httpService.post(AuthService.END_POINT + '/login/', user);
  }
  singUp(user: User): Observable<any> {
    return this.httpService.post(AuthService.END_POINT + '/singup/', user);
  }
}
