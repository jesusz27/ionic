import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
    selector: 'page-config',
    templateUrl: 'config.html'
})
export class ConfigPage {
    pages: Array<{ title: string, component: any }>;
    constructor(public navCtr: NavController) {
        this.pages = [
            { title: 'Cambiar clave de acceso', component: null },
            { title: 'Cambiar Id de acceso', component:  null },
            { title: 'Personalizar avatar', component:  null },
        ];
    }
    showPage(page) {
        this.navCtr.push(page.component);
    }
}
