import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'oidc-client';
import { Users, UsersService } from '../services/users.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent /*implements OnInit*/ {

  constructor(private userService: UsersService, private _router: Router) { }

  currentUser: Users | undefined;

  ngOnInit(): void {
    this.userService.currentUserStream.subscribe((user: Users | null) => {
      if (user != null)
        this.currentUser = user;
    })
    this.isUserLoggedIn();
  }

  private isNewUsersAvailableEventsSubscribed: boolean = false;
  public isUserLoggedIn() {
    console.log("UserProfileComponent.displayUser()");
    if (!this.isNewUsersAvailableEventsSubscribed) {
      
      this.isNewUsersAvailableEventsSubscribed = true;
    }
    //this._router.navigateByUrl("/login")
  }
}
