import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUserArgs, UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserForm: FormGroup;
  _userService: UsersService;

  constructor(fb: FormBuilder, userService: UsersService, private _router: Router) {
    this._userService = userService;
    this.registerUserForm = fb.group({
      firstName:  new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      numberToFeed: new FormControl()
      });
  }

  ngOnInit()  {
  }

  onSubmit(value: RegisterUserArgs): void {
    this._userService.RegisterUser(value);
    this._router.navigateByUrl("/")
  }
}
