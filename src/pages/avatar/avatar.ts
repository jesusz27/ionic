import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
@Component({
    selector: 'page-avatar',
    templateUrl: 'avatar.html'
})
export class AvatarPage {
    base64Image: any;
    constructor(public navCtr: NavController, private camera: Camera, private sanitizer: DomSanitizer, private transfer: FileTransfer, private file: File, private loadingCtrl: LoadingController) {
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
            console.log("error")
        });

    }
    upload() {
    let loader = this.loadingCtrl.create({
        content: "Uploading..."
      });
      loader.present();
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      let options: FileUploadOptions = {
        fileKey: 'avatar',
        fileName: "myImage_" + random + ".jpg",
        chunkedMode: false,
        httpMethod: 'post',
        mimeType: "image/jpeg",
        headers: {}
      }
      fileTransfer.upload(this.base64Image, 'http://192.168.0.15:9095/user/avatar', options)
        .then((data) => {
          alert("Success");
          loader.dismiss();
        }, (err) => {
          console.log(err);
          alert("Error");
          loader.dismiss();
        });  
    }
}
