import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket} from 'ng-socket-io';

@Injectable()
export class SocketService {

  constructor(public socket: Socket) {
  }

  getHelpLocation(): Observable<any> {
    let observable = new Observable(observer => {
        this.socket.on('receptor', (data) => {
          console.log("recepto - llego");
          observer.next(data);
        });
      })
      return observable;
  }

}