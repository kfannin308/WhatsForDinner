import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  @Output() newUsersAvailableEvent = new EventEmitter<Users>();

  private storedUserInfo: Users | any;

  public GetInfoFromDB() {
    let apiURL: string = "https://localhost:44418/users/test" + ".json";
    this.httpClient.get<Users>(apiURL).subscribe((gotData) => {
      this.storedUserInfo = gotData;
      this.newUsersAvailableEvent.emit(this.storedUserInfo);
    })
  }

}

export class Users {
  public userID: number = 0;
  public email: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public numberToFeed: number = 0;
}
