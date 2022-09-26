import { Component, OnInit, Input } from '@angular/core';
import { RecipesService, RecipeInfo, RecipeResults, RecipeDetails, Ingredients } from '../recipe.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  constructor(private thisRecipesService: RecipesService) { }
  @Input() public loadedDetails: RecipeDetails = new RecipeDetails();
  @Input() public loadedIngredients: Ingredients = new Ingredients();

  @Input() public id: number = 0;
  @Input() public aisle: string = "";
  @Input() public name: string = "";
  @Input() public amount: number = 0;
  @Input() public unit: string = "";

  ngOnInit(): void {

  }
 

}
