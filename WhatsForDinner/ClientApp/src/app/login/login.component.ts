import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  _userService: UsersService;
  constructor(userService: UsersService, fb: FormBuilder, private _router: Router) {
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
  }
}
