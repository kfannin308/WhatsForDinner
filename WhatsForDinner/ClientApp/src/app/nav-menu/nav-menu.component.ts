import { Component, OnInit } from '@angular/core';
import { Users, UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ShoppingListService} from '../services/shopping-list.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  currentUser: Users;
  _userService: UsersService;
  
  constructor(userService: UsersService, private _router: Router, private shoppingListService: ShoppingListService) {
    this._userService = userService;
   
  }
  ngOnInit(): void {
    this._userService.currentUserStream.subscribe((user: Users | null) => {
      if (user != null)
        this.currentUser = user;
    })
  }

  logOut() {
    this.shoppingListService.clearShoppingList();
    this.shoppingListService.getItems;
    this._userService.currentUserStream.next(null);
    this.currentUser = undefined;    
    this._router.navigateByUrl("/");
  }
  
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


}
