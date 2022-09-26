import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { AppSettings } from '../constants/appsettings';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private httpClient: HttpClient) {
    
  }

  appSettings: AppSettings = new AppSettings();

  private storedFavorites: Favorites[] | any;

  public GetFavoritesByUser(userId: string): Favorites[] {
    let apiURL: string = this.appSettings.baseUrl + "/viewfavorites";
    this.httpClient.post<Favorites[]>(apiURL, userId).subscribe((favorites: Favorites[]) => {
      this.storedFavorites = favorites;
      
    })
    return this.storedFavorites;
  }
}

export class Favorites {
  public favoriteID: number = 0;
  public recipeID: number = 0;
  public userID: number = 0;
}
