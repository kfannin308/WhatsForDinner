import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'oidc-client';
import { Users, UsersService } from '../services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent /*implements OnInit*/
{

  constructor(formbuilder: FormBuilder, private userService: UsersService, private _router: Router)
  {
    this.updateUserForm = formbuilder.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      numberToFeed: new FormControl()
    });
  }

  currentUser: Users | undefined;
  updateUserForm: FormGroup;
  showForm: string = "Hidden";



  ngOnInit(): void {
    this.userService.currentUserStream.subscribe((user: Users | null) => {
      if (user != null)
        this.currentUser = user;
    })
    this.isUserLoggedIn();
  }

  private isNewUsersAvailableEventsSubscribed: boolean = false;

  public isUserLoggedIn()
  {
    console.log("UserProfileComponent.displayUser()");
    if (!this.isNewUsersAvailableEventsSubscribed) {
      
      this.isNewUsersAvailableEventsSubscribed = true;
    }
    //this._router.navigateByUrl("/login")
  }

  toggle()
  {
    if (this.showForm == "Display")
    {
      this.showForm = "Hidden";
    }
    else
    {
      this.showForm = "Display";
    }
  }
      

  public updateUser(userchange: Users)
  {
    let targetUser: UpdateUser = new UpdateUser();

    
    if (this.currentUser.email != userchange.email)
      targetUser.email = userchange.email;
    if (this.currentUser.firstName != userchange.firstName)
      targetUser.firstName = userchange.firstName;
    if (this.currentUser.lastName != userchange.lastName)
      targetUser.lastName = userchange.lastName;
    if (this.currentUser.numberToFeed != userchange.numberToFeed)
      targetUser.numberToFeed = userchange.numberToFeed;

    if (this.currentUser.email == userchange.email || userchange.email == "" || userchange.email == null)
      targetUser.email = this.currentUser.email;
    if (this.currentUser.firstName == userchange.firstName || userchange.firstName == null || userchange.firstName == "")
      targetUser.firstName = this.currentUser.firstName;
    if (this.currentUser.lastName == userchange.lastName || userchange.lastName == null || userchange.lastName == "")
      targetUser.lastName = this.currentUser.lastName;
    if (this.currentUser.numberToFeed == userchange.numberToFeed || userchange.numberToFeed == null || userchange.numberToFeed == 0)
      targetUser.numberToFeed = this.currentUser.numberToFeed;



    this.userService.updateUser(targetUser);
  }
}

class UpdateUser {
  public email: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public numberToFeed: number = 0;
}
