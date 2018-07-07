import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { UserService } from '../../providers/user.service';
import { ContactService } from '../../providers/contact.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { UserStorageService } from '../../providers/user-storage.service';
import 'rxjs/add/operator/debounceTime';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  autocompleteItems: User[] = [];
  temp: any;
  searchControl: FormControl;
  toggle: boolean = false;
  searchTerm: string = '';
  searching: any = false;
  contacts: User[] = [];

  constructor(public navCtrl: NavController, public userService: UserService, public contactService:ContactService,public userStorageService:UserStorageService) {
    this.searchControl = new FormControl();
    this.allUser();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }
  allUser() {
    this.userService.findAll().subscribe(
      data => {
        this.autocompleteItems = data;
        this.temp = data;
      }
    )
  }
  onSearchInput() {
    this.searching = true;
  }

  selectItem(user:User) {
    this.toggle = false;
    this.contacts.push(user);
    
    this.userStorageService.getIdUser()
    .then((idUser) => {
      const contact:Contact = { codUser:idUser,codContact:user.idUser}
        this.contactService.create(contact).subscribe(
          data => console.log("agregado")
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

}
