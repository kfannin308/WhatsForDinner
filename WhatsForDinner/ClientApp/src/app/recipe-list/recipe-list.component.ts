import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { ShoppingListService, ShoppingList} from '../services/shopping-list.service';
import { Ingredients } from '../services/recipe.service';
import { Favorites, FavoritesService } from 'src/app/services/favorites.service'
import { Users, UsersService } from '../services/users.service'
import { RecipesService, RecipeInfo, RecipeResults, RecipeDetails } from '../services/recipe.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public detailId: number = 0;
  public userFavs: Favorites[] | any;
  currUser: Users;
  _userService: UsersService;
  constructor(private thisRecipesService: RecipesService, private shoppingListService: ShoppingListService, private usersService: UsersService,
    private favoritesService: FavoritesService, @Inject('BASE_URL') baseUrl: string) {
    this._userService = usersService;
  }
  @Input() public id: number = 0;
  @Input() public title: string = "";
  @Input() public image: string = "";
  @Input() public imageType: string = "";

  @Input() public loadedDetails: RecipeDetails = new RecipeDetails();

  @Input() public loadedIngredients: Ingredients = new Ingredients();

  async ngOnInit() {
    this._userService.currentUserStream.subscribe((user: Users | null) => {
      if (user != null)
        this.currUser = user;
    })
    this.userFavs = await this.favoritesService.GetFavoritesByUser(this.currUser.userID);
  }

 
 
  public updateFavorites(_recipeID: number, isChecked: boolean) {
    if (isChecked == true) {
      this.favoritesService.AddToFavorites(this.currUser.userID, _recipeID, this.title, this.image);
    }
    else {
      this.favoritesService.DeleteFromFavorites(this.currUser.userID, _recipeID, this.title, this.image);
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
