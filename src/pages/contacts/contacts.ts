import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/services-rest/user.service';
import { ContactService } from '../../services/services-rest/contact.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { UserStorageService } from '../../services/user-storage.service';
import 'rxjs/add/operator/debounceTime';
import { Contact } from '../../models/contact.model';
import { ContactSelected } from '../../models/contactSelected.model';
import { Strings } from "../../utils/strings";
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  autocompleteItems: User[] = [];
  temp: any;
  searchControl: FormControl;
  toggle: boolean = false;
  searchTerm: string = '';
  searching: any = false;
  contacts: ContactSelected[] = [];

  constructor(public navCtrl: NavController, public userService: UserService, public contactService: ContactService, public userStorageService: UserStorageService, public actionSheetCtrl: ActionSheetController, private toastService:ToastService) {
    this.searchControl = new FormControl();
    this.allUser();
    this.findContacts();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }
  allUser() {
    this.userService.findAll().subscribe(
      data => {
        this.userStorageService.getIdUser()
          .then((idUser) => {
            this.temp = data.filter((item) => {
              return item.idUser != idUser;
            })
            this.autocompleteItems = this.temp;
            console.log(this.autocompleteItems);
          })
      }
    )
  }
  findContacts() {
    this.userStorageService.getIdUser()
      .then((idUser) => {
        this.contactService.findByCodUser(idUser).subscribe(
          data => {
            for (let i = 0; i < data.length; i++) {
              this.contacts.push(data[i]);
            }
            console.log(data);
          }
        )
      })
  }
  onSearchInput() {
    this.searching = true;
    if (this.temp && this.contacts) {
      for (let i = 0; i < this.contacts.length; i++) {
        this.temp = this.temp.filter((item) => {
          return item.idUser != this.contacts[i].idUser;
        })
      }
    }
  }

  selectItem(contactSelect: ContactSelected) {
    this.toggle = false;
    this.userStorageService.getIdUser()
      .then((idUser) => {
        const contact: Contact = { codUser: idUser, codContact: contactSelect.idUser }
        this.contactService.create(contact).subscribe(
          data => {
            this.contacts.push(data);
            this.toastService.presentToast(Strings.CONTACTO_AGREGADO);
            console.log(this.contacts)
          }
        )
      }
      )

  }
  filterItems() {
    this.toggle = true;
    if (!this.searchTerm) {
      this.toggle = false;
    }
    this.autocompleteItems = this.temp;
    this.autocompleteItems = this.autocompleteItems.filter((item) => {
      return ((item.idUser + item.email).toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    })
  }
  presentActionSheet(contactSelect: ContactSelected) {
    console.log("presionado");
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: contactSelect.status != "SELECTED" ? 'Contacto elegido' : 'Contacto no elegido',

          role: 'destructive',
          icon: contactSelect.status == "SELECTED" ? 'remove-circle' : 'add',
          handler: () => {
            let status: string = '';
            contactSelect.status == "SELECTED" ? status = 'UNSELECTED' : status = 'SELECTED';
            this.contactService.update(contactSelect.id, status).subscribe(
              data => {
                console.log("update");
                console.log(this.contacts);
                this.toastService.presentToast(Strings.CONTACTO_ACTUALIZADO);
                for (let i = 0; i < this.contacts.length; i++) {
                  if (this.contacts[i].id == data.id) {
                    this.contacts[i].status = status;
                  }
                }
              }
            )
          }
        },
        {
          text: 'Eliminar',
          icon: 'close-circle',
          cssClass: 'EditionIcon',
          handler: () => {
            this.contactService.delete(contactSelect.id).subscribe(
              data => {
                this.toastService.presentToast(Strings.CONTACTO_ELIMINADO);
                for (let i = 0; i < this.contacts.length; i++) {
                  if (this.contacts[i].id == contactSelect.id) {
                    this.contacts.splice(i, 1);
                  }
                }
              }
            )
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
