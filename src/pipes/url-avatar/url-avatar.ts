import { Pipe, PipeTransform } from '@angular/core';
import { Configs } from '../../utils/configs';

@Pipe({
  name: 'urlAvatar',
})
export class UrlAvatarPipe implements PipeTransform {

  transform(value: string, ...args) {
    return Configs.SERVER + '/' + value;
  }
}
