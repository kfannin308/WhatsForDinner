import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Input, Output, Inject } from '@angular/core';
import { AppSettings } from '../constants/appsettings';
import { UsersService, Users } from 'src/app/services/users.service'

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private httpClient: HttpClient, private usersService: UsersService, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  baseUrl: string = ''
  appSettings: AppSettings = new AppSettings();

  private storedFavorites: Favorites[] | any;

  public async GetFavoritesByUser(userId: number): Promise<Favorites[]> {
    let localThis: FavoritesService = this;
    let apiURL: string = localThis.appSettings.baseUrl + "/favorites/viewfavorites?userID=" + userId.toString();
    let favorites: Favorites[] | undefined = await localThis.httpClient.get<Favorites[]>(apiURL).toPromise();
    return favorites;
  }
  /*favgrid changes*/
  public AddToFavorites(userID: number, recipeID: number/*, recipeTitle: string, recipeImage: string*/) {
    let userFavs: FavoritesArgs = new FavoritesArgs();
    userFavs.recipeID = recipeID;
    userFavs.userID = userID;
    /*favgrid changes*/
   /* userFavs.title = recipeTitle;
    userFavs.image = recipeImage;*/
    let apiURL: string = this.baseUrl + "favorites/addtofavorites";
    this.httpClient.post(apiURL, userFavs).subscribe();
  }

  public DeleteFromFavorites(userID: number, recipeID: number) {
    let userFavs: FavoritesArgs = new FavoritesArgs();
    userFavs.recipeID = recipeID;
    userFavs.userID = userID;
    let apiURL: string = this.baseUrl + "favorites/deletefavorites";
    this.httpClient.post(apiURL, userFavs).subscribe();
  }
}


export class FavoritesArgs {
  recipeID: number;
  userID: number;
}

export interface Favorites {
  favoriteID: number;
  recipeID: number;
  userID: number;
  title: string;
  image: string;
}
