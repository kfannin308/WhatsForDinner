import { Component, OnInit } from '@angular/core';
import { Favorites, FavoritesService } from '../services/favorites.service';
import { Users, UsersService } from '../services/users.service';
import { RecipesService, RecipeInfo, RecipeResults, RecipeDetails } from '../services/recipe.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  private _favoriteService: FavoritesService;
  private _userService: UsersService;
  favorites: Favorites[] = [];
  currentUser: Users | undefined; // declaring instance variable. 

  constructor(favoriteService: FavoritesService, userService: UsersService, private thisRecipesService: RecipesService) {
    this._favoriteService = favoriteService;
    this._userService = userService;
  }
  private isNewFavDetailsAvailableEventSubscribed: boolean = false;
  public loadedFavDetails: RecipeDetails = new RecipeDetails();

  async ngOnInit(): Promise<void> {
    this._userService.currentUserStream.subscribe((user: Users | null) => {   // we are using the userservice to subscribe to the current user stream which knows who the current user is to then set it to our instance variable this.currentUser
      if (user != null)
        this.currentUser = user;  // this initializing/setting the current user
    })
    if (this.currentUser != null && this.currentUser.userID != null) {
      this.favorites = await this._favoriteService.GetFavoritesByUser(this.currentUser?.userID);
      //if (this.favorites != null) {
        
      //  for (let favorite of this.favorites ) {
      //    this.GetFavoriteDetails(favorite.recipeID);
      //    console.log("id is: " + favorite.recipeID);
          
      //    favorite.title = this.loadedFavDetails.title;
      //    favorite.image = this.loadedFavDetails.image;
      //    console.log("Fav title:" + favorite.title + "loadedFavDetails: " + this.loadedFavDetails.title);
           
      //  }
      }

    }
  }
  //public GetFavoriteDetails(favId:number) {
  //  console.log("getFavoriteDetails Id: " + favId);
  //  if (!this.isNewFavDetailsAvailableEventSubscribed) {
  //    this.thisRecipesService.newDetailAvailableEvent.subscribe((gotData) => {
  //      this.loadedFavDetails = gotData;
  //    })
  //    this.isNewFavDetailsAvailableEventSubscribed = true;
  //  }
   
  //  this.thisRecipesService.GetRecipeDetails(favId);
  //  console.log("hit GetDetails Id: " + favId + "loadedFaveDetails: " + this.loadedFavDetails.title);
  //}

//}
export class favs {
  favoriteID: number;
  recipeID: number;
  userID: number;
  title: string;
  image: string;
}
