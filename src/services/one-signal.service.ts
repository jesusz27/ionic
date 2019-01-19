import { OneSignal } from '@ionic-native/onesignal';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { UserService } from "./services-rest/user.service";
import { User } from "../models/user.model";
import { UserStorageService } from "./user-storage.service";

@Injectable()
export class OneSignalService {

    notification: any;
    private noticationObservable: Subject<any> = new Subject();
    constructor(public oneSignal: OneSignal, public alertCtrl: AlertController, public userService: UserService, public userStorageService: UserStorageService) {
        this.handlerNotifications();
    }

    private handlerNotifications() {
        this.oneSignal.startInit('50b7df5b-0343-4c20-ae2a-ed518bbaefbb', '938474573173');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationOpened().subscribe(jsonData => {
            this.notificationValue(jsonData);
        });
        this.oneSignal.handleNotificationReceived().subscribe(jsonData => {
            this.notificationValue(jsonData);
        });
        this.sendIdNotification();
        this.oneSignal.endInit();
    }

    private notificationValue(data) {
        this.noticationObservable.next(data);
    }

    public getNoticationObservable(): Observable<any> {
        return this.noticationObservable.asObservable();
    }

    private sendIdNotification() {
        this.oneSignal.getIds().then(
            id => {
                this.userStorageService.getIdUser().then(
                    idUser => {
                        const user: User = { idUser: idUser, idNotification: id.userId }
                        this.userService.updateIdNotification(user).subscribe(
                            data => console.log(data)
                        )
                    }
                )
            }
        )
    }
}
