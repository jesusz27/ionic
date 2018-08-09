import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'page-avatar',
    templateUrl: 'avatar.html'
})
export class AvatarPage {
    base64Image: any;
    constructor(public navCtr: NavController, private camera: Camera, private sanitizer: DomSanitizer) {

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
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            console.log(imageData);
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log("entro img");
            console.log(this.base64Image);
        }, (err) => {
            // Handle err
        });

    }
}
