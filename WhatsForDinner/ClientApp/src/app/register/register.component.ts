import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.registerUserForm = fb.group({
      firstName:  new FormControl(),
      lastName: new FormControl(),
      email: new FormControl()
      });
  }

  ngOnInit()  {
  }

  onSubmit(value: string): void {

    console.log('you submitted value: ', value);

  }
}
