import { Pipe, PipeTransform } from '@angular/core';
import { Configs } from '../../utils/configs';
/**
 * Generated class for the UrlAvatarPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'urlAvatar',
})
export class UrlAvatarPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    console.log("ruta: " + Configs.SERVER + '/' + value);
    return Configs.SERVER + '/' + value;
  }
}
