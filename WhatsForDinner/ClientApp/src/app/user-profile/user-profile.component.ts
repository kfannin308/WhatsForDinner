import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users, UsersService } from 'src/app/users.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private thisUserService: UsersService) { }

  public newUser: Users | any;

  ngOnInit(): void {
  }

  private isNewUsersAvailableEventsSubscribed: boolean = false;
  public displayUser() {
    if (!this.isNewUsersAvailableEventsSubscribed) {
      this.thisUserService.newUsersAvailableEvent.subscribe((gotData) => {
          this.newUser.push(gotData);
      })
      this.isNewUsersAvailableEventsSubscribed = true;
    }
    this.thisUserService.GetInfoFromDB();
  }
}
