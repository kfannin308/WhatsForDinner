import { EventEmitter, Injectable, Input, Output, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from '../constants/appsettings';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {

  }

  @Output() newUsersAvailableEvent = new EventEmitter<Users[]>();
  @Output() newLoginAvailableEvent = new EventEmitter<Users>();
  @Output() loginChangeEvent = new EventEmitter<UsersLoginEventArgs>();
  // instance variables below here. 
  appSettings: AppSettings = new AppSettings();
  baseUrl: string = this.appSettings.baseUrl;
  activeUser: Users;
  // currentUserStream is an observable used to publish/broadcast a current user to a subscriber.
  currentUserStream: Subject<Users | null> = new BehaviorSubject<Users | null>(null);// way to store an stream current user.
  // instance variables end.

  //public GetUserID(): number {
    //return this.activeUser.userID;
    //return 5;
 // }

  public setCurrentUser(newUser: Users): void {
    if (newUser != null) {
      this.activeUser = newUser;
      this.currentUserStream.next(newUser);
    }
    else {
      this.activeUser = null;
      this.currentUserStream.next(null);
    }
  }

  public removeCurrentUser(): void {
    this.currentUserStream.next(null);

  }

  public RegisterUser(user: RegisterUserArgs) {
    let apiURL: string = this.baseUrl + "/users/register";
    if (user.firstName != null && user.email != null && user.lastName != null && user.numberToFeed != null) {
      this.httpClient.post(apiURL, user).subscribe(() => {
        console.log("register user successful");
      });

    }
    else {
      alert("Registration information not complete");
    }

  }

  public LoginUser(email: string) {
    let apiURL: string = this.baseUrl + "/users/login";
    this.httpClient.post<Users>(apiURL, email).subscribe((userResponse: Users) => {
      this.setCurrentUser(userResponse);

    })
  }

  //Method is to set user to empty or null
  public Logout() {
    this.removeCurrentUser();

  }

  //loggedIn is assumed to be TRUE
 // private onUserLoginChange(loggedIn: boolean) {

    //Create a new login change event args.
   // let loggedInUser: Users = this.storedLoginInfo;
    //let loginchangeeventarg: UsersLoginEventArgs = new UsersLoginEventArgs(loggedIn, loggedInUser);
   // this.loginChangeEvent.emit(loginchangeeventarg);

 // }

}

export interface Users extends RegisterUserArgs {
  userID: number;
}

export interface RegisterUserArgs {
  email: string;
  firstName: string;
  lastName: string;
  numberToFeed: number;
}


export class UsersLoginEventArgs {

  constructor(imIn: boolean, args: Users) {
    this.isLoggedIn = imIn;
  }


  public isLoggedIn: boolean = false;
 
}
