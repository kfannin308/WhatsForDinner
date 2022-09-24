import { EventEmitter, Injectable, Input, Output, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService
{

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  @Output() newUsersAvailableEvent = new EventEmitter<Users[]>();
  @Output() newLoginAvailableEvent = new EventEmitter<Users>();
  @Output() loginChangeEvent = new EventEmitter<UsersLoginEventArgs>();

  private storedUserInfo: Users[] = [];
  private storedLoginInfo: Users = new Users;

  public GetInfoFromDB()
  {
    let apiURL: string = this.baseUrl + "/users/test";
    this.httpClient.get<Users[]>(apiURL).subscribe((gotData) => {
      this.storedUserInfo = gotData;
      this.newUsersAvailableEvent.emit(this.storedUserInfo);
    })
  }

  // + "?=" + email

  public LoginUser()
    {
    let apiURL: string = this.baseUrl + "/users/login";
    this.httpClient.get<Users>(apiURL).subscribe((gotData) => {
      this.storedLoginInfo = gotData;
      //this.newLoginAvailableEvent.emit(this.storedLoginInfo);

      this.onUserLoginChange(true);

      })
    }

  //Method is to set user to empty or null
  public Logout() {
    this.storedLoginInfo = new Users(); //Bret... look up the correct syntax for this declaration. 
    this.onUserLoginChange(false);

  }

  //loggedIn is assumed to be TRUE
  private onUserLoginChange(loggedIn: boolean) {

    //Create a new login change event args.
    let loggedInUser: Users = this.storedLoginInfo;
    let loginchangeeventarg: UsersLoginEventArgs = new UsersLoginEventArgs(loggedIn, loggedInUser); 
    this.loginChangeEvent.emit(loginchangeeventarg);
    
  }

}

export class Users {
  public userID: number = 0;
  public email: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public numberToFeed: number = 0;
}


//Bret's class that Dominion was forced to write at the direction of Toni. 
export class UsersLoginEventArgs {

  constructor(imIn: boolean, args: Users ) {
    this.isLoggedIn = imIn;
    this.userIn = args;
  }


  public isLoggedIn: boolean = false;
  public userIn: Users = new Users();
}
