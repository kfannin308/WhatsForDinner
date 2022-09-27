import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { ShoppingListService, ShoppingList } from '../shopping-list.service';
import { Ingredients } from '../services/recipe.service';
import { RecipesService, RecipeInfo, RecipeResults, RecipeDetails } from '../services/recipe.service';
/*import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';*/

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public detailId: number = 0;
  constructor(private thisRecipesService: RecipesService, private shoppingListService: ShoppingListService) { }
  @Input() public id: number = 0;
  @Input() public title: string = "";
  @Input() public image: string = "";
  @Input() public imageType: string = "";

  @Input() public loadedDetails: RecipeDetails = new RecipeDetails();

  @Input() public loadedIngredients: Ingredients = new Ingredients();

  ngOnInit(): void {
  }

  public addToList(ingredient: Ingredients) {
    this.shoppingListService.addToList(this.loadedIngredients);
    window.alert('Your ingredients have been added to the Shopping List! Total Items in Shopping List:' +
      this.shoppingListService.items.length.toString());
    console.log('Details Add - Cart Items Total: ' + this.shoppingListService.items.length.toString());


  }
}
