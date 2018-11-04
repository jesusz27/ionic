import { NgModule } from '@angular/core';
import { DateFormatPipe } from './date-format/date-format';
import { UrlAvatarPipe } from './url-avatar/url-avatar';
@NgModule({
	declarations: [DateFormatPipe,
    UrlAvatarPipe],
	imports: [],
	exports: [DateFormatPipe,
    UrlAvatarPipe]
})
export class PipesModule {}
