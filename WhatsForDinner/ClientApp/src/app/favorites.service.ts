import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Input, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private httpClient: HttpClient) { }

  @Output() newFavoritesAvailableEvent = new EventEmitter<Favorites>();

  private storedFavorites: Favorites | any;

  public GetFavoritesFromDB() {
    let apiURL: string = "https://localhost:44418/favorites/test" + ".json";
    this.httpClient.get<Favorites>(apiURL).subscribe((gotData) => {
      this.storedFavorites = gotData;
      this.newFavoritesAvailableEvent.emit(this.storedFavorites);
    })
  }
}

export class Favorites {
  public favoriteID: number = 0;
  public recipeID: number = 0;
  public userID: number = 0;
}
