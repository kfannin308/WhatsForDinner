import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users, UsersService } from 'src/app/users.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent /*implements OnInit*/ {

  constructor(private thisUserService: UsersService) { }

  public newUsers: Users = new Users();

  ngOnInit(): void {
    this.displayUser();
  }

  /*
  for(let currElementNo = 0; currElementNo <gotData.count; currElementNo++)
this.loadedDonuts.results.push(gotData.results[currElementNo]);
*/

  private isNewUsersAvailableEventsSubscribed: boolean = false;
  public displayUser() {
    console.log("UserProfileComponent.displayUser()");
    if (!this.isNewUsersAvailableEventsSubscribed) {
      this.thisUserService.newLoginAvailableEvent.subscribe((gotData) => {
       // for (let current = 0; current < gotData.count; current++)
         // this.newUser.push(gotData);
        this.newUsers = gotData;
      })
      this.isNewUsersAvailableEventsSubscribed = true;
    }
    this.thisUserService.LoginUser();
  }
}
