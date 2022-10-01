import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { ShoppingListService, ShoppingList} from '../shopping-list.service';
import { Ingredients } from '../services/recipe.service';
import { Favorites, FavoritesService } from 'src/app/services/favorites.service'
import { UsersService } from '../services/users.service'
import { RecipesService, RecipeInfo, RecipeResults, RecipeDetails } from '../services/recipe.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public detailId: number = 0;
  public currUserID: number = 0;
  public userFavs: Favorites[] | any;

  constructor(private thisRecipesService: RecipesService, private shoppingListService: ShoppingListService, private usersService: UsersService, private favoritesService: FavoritesService) { }
  @Input() public id: number = 0;
  @Input() public title: string = "";
  @Input() public image: string = "";
  @Input() public imageType: string = "";

  @Input() public loadedDetails: RecipeDetails = new RecipeDetails();

  @Input() public loadedIngredients: Ingredients = new Ingredients();

  async ngOnInit() {
    this.currUserID = this.usersService.GetUserID();
    this.userFavs = await this.favoritesService.GetFavoritesByUser(this.currUserID);
  }

 
  /*
  public addToList(ingredient: Ingredients) {
    this.shoppingListService.addToList(this.loadedIngredients);
    window.alert('Your ingredients have been added to the Shopping List! Total Items in Shopping List:' +
      this.shoppingListService.items.length.toString());
    console.log('Details Add - Cart Items Total: ' + this.shoppingListService.items.length.toString());
  }
  */
  //public addToFavorites(_recipeID: number) {
  //  this.favoritesService.AddToFavorites(this.currUserID, _recipeID);
  //  console.log("works! " + _recipeID + " " + this.currUserID);
  //}

  //public deleteFromFavorites(_recipeID: number) {
  //  this.favoritesService.DeleteFromFavorites(this.currUserID, _recipeID);
  //  console.log("works!");
  //}

  public updateFavorites(_recipeID: number, isChecked: boolean) {
    if (isChecked == true) {
      this.favoritesService.AddToFavorites(this.currUserID, _recipeID);
    }
    else {
      this.favoritesService.DeleteFromFavorites(this.currUserID, _recipeID);
    }
  }

  public isInFavorites(_recipeID: number): boolean {
    let recipeFavorited = false;
    for (var i = 0; i < this.userFavs?.length; i++)
    {
      if (this.userFavs[i].recipeID == _recipeID) {
        recipeFavorited = true;
        break;
      }
    }
    
    return recipeFavorited;
  }
}
