import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import * as io from 'ng-socket-io';
import { User } from '../models/user.model';
import { TrackStorageService } from './track-storage.service'

@Injectable()
export class SocketService {

  static LOCATION_EMIT = 'probar';
  static LOCATION_ON = 'receptor';
  static ADD_USER = 'addUserSocket';

  constructor(public socket: Socket, public trackStorageService: TrackStorageService) {
    const user: User = { idUser: 'Jesus1352' };
    this.initialize(user);
  }

  initialize(user: User) {
    this.socket.on("connect", (msg) => {
      this.addUser(user);
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
    this.socket.emit(SocketService.ADD_USER, user);
  }

}