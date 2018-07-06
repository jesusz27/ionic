import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { UserService } from '../../providers/user.service';
import { User } from '../../models/user.model';
import 'rxjs/add/operator/debounceTime';

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

  constructor(public navCtrl: NavController, public userService: UserService) {
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

  selectItem(val: any) {
    this.toggle = false;
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
