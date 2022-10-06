import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  _userService: UsersService;
  constructor(userService: UsersService, fb: FormBuilder, private _router: Router,
    private shoppingListService: ShoppingListService, @Inject('BASE_URL') baseUrl: string ) {
    this._userService = userService;
    this.loginUserForm = fb.group({
     
      email: new FormControl()
    });
  }

  ngOnInit(): void {

  }

  onSubmit(value: string): void {
    this._userService.LoginUser(value);
    this._router.navigateByUrl("/user-profile")
  }

  logOut() {
    this._userService.Logout();
    this.shoppingListService.clearShoppingList();
    this.shoppingListService.getItems;
    
    
  }
}
