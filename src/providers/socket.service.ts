import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { User } from '../models/user.model';
import { TrackStorageService } from './track-storage.service';
import { UserStorageService } from './user-storage.service'

@Injectable()
export class SocketService {

  static LOCATION_EMIT = 'probar';
  static LOCATION_ON = 'receptor';
  static ADD_USER = 'addUserSocket';
 
  constructor(public socket: Socket, public trackStorageService: TrackStorageService, public userStorageService: UserStorageService) {
    const activeSocket=this.getTrackHelp().subscribe();
    activeSocket.unsubscribe();
  }

  initialize() {
    this.socket.on("connect", (msg) => {
      this.userStorageService.getIdUser()
        .then((idUser) => {
          const user: User = { idUser: idUser };
          console.log("socket init" + idUser);
          this.addUser(user);
        });
    });
  }
  getTrackHelp(): Observable<any> {
    return new Observable(observer => {
      this.socket.on(SocketService.LOCATION_ON, (data) => {
        this.trackStorageService.add(data);
        observer.next(data);
      });
    })
  }
  emitTrackHelp(location) {
    this.socket.emit(SocketService.LOCATION_EMIT, location);
  }
  addUser(user: User) {
    console.log("emit adduser");
    this.socket.emit(SocketService.ADD_USER, user);
  }

}