import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ToastService } from '../../providers/toast.service';
import { UserStorageService } from '../../providers/user-storage.service';
import { File } from '@ionic-native/file';
import { User } from "../../models/user.model";
import { Strings } from "../../utils/strings";
import { Configs } from "../../utils/configs";
@Component({
    selector: 'page-avatar',
    templateUrl: 'avatar.html'
})
export class AvatarPage {
    base64Image: any;
    idUser: string;
    constructor(private navCtr: NavController, private camera: Camera, private sanitizer: DomSanitizer, private transfer: FileTransfer, private file: File, private loadingCtrl: LoadingController, private userStorageService: UserStorageService, private toastService: ToastService) {
        this.userStorageService.getIdUser().then(
            (idUser) => this.idUser = idUser
        )
    }
    openGallery() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        }
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            this.toastService.presentToast("Error" + err);
        });

    }
    upload() {
        if (this.base64Image) {
            let loader = this.loadingCtrl.create({
                content: "" + Strings.SUBIENDO
            });
            loader.present();
            const fileTransfer: FileTransferObject = this.transfer.create();
            var random = Math.floor(Math.random() * 10000);
            let options: FileUploadOptions = {
                fileKey: 'avatar',
                fileName: "myImage_" + random + ".jpg",
                chunkedMode: false,
                httpMethod: 'post',
                mimeType: "image/jpeg",
                headers: {},
            }
            fileTransfer.upload(this.base64Image, Configs.SERVER+'/user/avatar/' + this.idUser, options)
                .then((data) => {
                    console.log(data.response);
                    const user: User = JSON.parse(data.response);
                    this.userStorageService.setAvatar(user.avatar);
                    this.toastService.presentToast(Strings.CARGADO_CORRECTAMENTE);
                    loader.dismiss();
                }, (err) => {
                    console.log(err);
                    this.toastService.presentToast(Strings.CARGADO_INCORRECTAMENTE);
                    loader.dismiss();
                });
        }else{
            this.toastService.presentToast(Strings.SELECCIONAR_IMAGEN);
        }
    }
}
