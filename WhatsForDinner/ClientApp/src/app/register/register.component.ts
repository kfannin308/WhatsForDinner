import { Component, OnInit, Inject } from '@angular/core';
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

  constructor(fb: FormBuilder, userService: UsersService, private _router: Router, @Inject('BASE_URL') baseUrl: string) {
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
  // the value is taken from the form builder in Angular
  onSubmit(value: RegisterUserArgs): void {
    this._userService.RegisterUser(value);
    //let loginParam: Object = new Object({ email: value.email });
    //this._userService.LoginUser(value.email);
    //let autoLogin: AutoLogin = new AutoLogin();
    //autoLogin.email = value.email;
    //this._userService.LoginUser(autoLogin.email);
    this._router.navigateByUrl("/")
  }
}

//class AutoLogin {
//  public email: string = "";
//}
