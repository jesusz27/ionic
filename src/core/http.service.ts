import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Configs } from '../utils/configs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { Error } from './error.model';

@Injectable()
export class HttpService {

    static API_END_POINT = Configs.SERVER;
    private token: string;

    private params: URLSearchParams;

    private headers: Headers;

    private responseType: ResponseContentType;

    private successfulNotification = undefined;

    constructor(private http: Http, public toastCtrl: ToastController, private storage: Storage
    ) {
        this.resetOptions();
        this.prepareToken();
    }

    private prepareToken() {
        this.storage.get('token').then(
            data => {
                if (data != undefined) {
                    this.token = data;
                } else {
                    this.token = undefined;
                }
            });
    }

    public setToken(token: string) {
        this.storage.set('token', token).then(
            data => {
                this.token = token;
            });
    }

    public getToken() {
        return this.token;
    }

    public removeToken() {
        this.token = null;
        this.storage.remove('token');
    }

    private resetOptions(): void {
        this.headers = new Headers();
        this.params = new URLSearchParams();
        this.responseType = ResponseContentType.Text;
    }

    get(endpoint: string): Observable<any> {
        return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    post(endpoint: string, body?: Object): Observable<any> {
        return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    delete(endpoint: string): Observable<any> {
        return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    put(endpoint: string, body?: Object): Observable<any> {
        return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    patch(endpoint: string, body?: Object): Observable<any> {
        return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    private createOptions(): RequestOptions {
        const options: RequestOptions = new RequestOptions({
            headers: this.headers,
            params: this.params,
            responseType: this.responseType
        });
        this.resetOptions();
        return options;
    }

    private extractData(response: Response): any {
        if (this.successfulNotification) {
            this.presentToast(this.successfulNotification);
            this.successfulNotification = undefined;
        }
        const token = response.headers.get('token');
        if(token){
            this.setToken(token);
        }
        const contentType = response.headers.get('content-type');
        if (contentType) {
            if (contentType.indexOf('application/json') !== -1) {
                return response.json();
            }
        } else if (response.text()) {
            return response.text();
        } else {
            return response;
        }
    }

    private handleError(response: Response): any {
        let error: Error;
        try {
            error = {
                httpError: response.status, exception: response.json().exception,
                message: response.json().message, path: response.json().path
            };
            this.presentToast(response.status.toString() + ' ' + response.json().message);
            return Observable.throw(error);
        } catch (e) {
            this.presentToast(response.status.toString());
            return Observable.throw(response);
        }
    }

    presentToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }

    param(key: string, value: string): HttpService {
        this.params.append(key, value);
        return this;
    }

    header(key: string, value: string): HttpService {
        this.headers.append(key, value);
        return this;
    }

    authToken(): HttpService {
        this.headers.append('authorization', this.token);
        return this;
    }

    successful(notification?: String): HttpService {
        if (notification) {
            this.successfulNotification = notification;
        } else {
            this.successfulNotification = 'Successful';
        }
        return this;
    }
}
