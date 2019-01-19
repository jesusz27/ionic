import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PasswordPage } from './password/password';
import { AvatarPage } from './avatar/avatar';

@Component({
    selector: 'page-config',
    templateUrl: 'config.html'
})

export class ConfigPage {
    pages: Array<{ title: string, component: any }>;
    constructor(public navCtr: NavController) {
        this.pages = [
            { title: 'Cambiar clave de acceso', component: PasswordPage },
            { title: 'Personalizar avatar', component: AvatarPage },
        ];
    }
    
    showPage(page) {
        this.navCtr.push(page.component);
    }
}
