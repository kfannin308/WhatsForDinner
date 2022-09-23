import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
//import { CartService } from '../cart.service';
import { RecipesService, RecipeInfo, RecipeResults} from '../recipe.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.css']
})

export class SearchRecipesComponent implements OnInit {
  public loadedRecipes: RecipeResults = new RecipeResults();
  private isNewRecipeAvailableEventSubscribed: boolean = false;
  private isNewFilteredRecipeAvailEventSubscribed: boolean = false;
  private isNewRandomRecipeAvailEventSubscribed: boolean = false;
  private isNewMockDataAvailEventSubscribed: boolean = false;

  public myType: string = "";
  public myWordSearch: string = "";
  public myCuisine: string = "";
  public restrictions: string = "";
  private filterString: string = "";
  public maxReadyTime: number = 0;
  public maxCalories: number = 0;

  constructor(private thisRecipesService: RecipesService /* private cartService: CartService */) {
  }

  ngOnInit(): void {
    
  }

  clearRecipeList() {
    this.loadedRecipes.results = [];
    return this.loadedRecipes;
  }
  public getListwithFilter(myType: string, wordSearch: string, cuisine: string, maxReadyTime: number, maxCalories: number) {
    // The order is important here.  If we subscribe FIRST, we can guarantee we will receive
    // all data provided by the event.  If we subscribe SECOND, we may not.

    console.log("filters: " + this.myType + "  " + this.myWordSearch + "  " + this.myCuisine + " " + this.maxReadyTime + " " + this.maxCalories);
    if (!this.isNewFilteredRecipeAvailEventSubscribed) {
      this.thisRecipesService.newFilteredRecipesAvailableEvent.subscribe((gotData) => {
        for (let currElementNo = 0; currElementNo < gotData.results.length; currElementNo++)
          this.loadedRecipes.results.push(gotData.results[currElementNo]);
        console.log("Data arrived!  We got " + gotData.results.length.toString() + " records.");

      })
      this.isNewFilteredRecipeAvailEventSubscribed = true;
    }
    if (this.myType != "") {
      this.filterString = this.filterString + "&type=" + this.myType;

    }
    if (this.myCuisine != "") {
      this.filterString = this.filterString + "&cuisine=" + this.myCuisine;

    }
    if (this.myWordSearch != "") {
      this.filterString = this.filterString + "&query=" + this.myWordSearch;
    }
    if (this.maxReadyTime != 0) {
      this.filterString = this.filterString + "&maxReadyTime" + this.maxReadyTime;
    }
    if (this.maxCalories != 0) {
      this.filterString = this.filterString + "&maxCalories" + this.maxReadyTime;
    }
    console.log("myType: " + this.myType);
    console.log("myCuisine: " + this.myCuisine);
    console.log("myWordSearch: " + this.myWordSearch);
    console.log("maxReadyTime: " + this.maxReadyTime);
    console.log("maxCalories: " + this.maxCalories);
    console.log("FilterString: " + this.filterString);
    
    this.thisRecipesService.GetListWithFilter(this.filterString);
    this.myType = "";
    this.myCuisine = "";
    this.myWordSearch = "";
    this.filterString = "";
  }

  public getRandomRecipes() {

    if (!this.isNewRandomRecipeAvailEventSubscribed) {
      console.log("Hit GetRandomRecipe");
      this.thisRecipesService.newRandomRecipesAvailableEvent.subscribe((gotData) => {
        for (let currElementNo = 0; currElementNo < gotData.results.length; currElementNo++)
          this.loadedRecipes.results.push(gotData.results[currElementNo]);
        console.log("Data arrived!  We got " + gotData.results.length.toString() + " records.");

      })
      this.isNewRandomRecipeAvailEventSubscribed = true;
    }

    this.thisRecipesService.GetListRandom();
  }
  public getMockRecipes() {
    if (!this.isNewMockDataAvailEventSubscribed) {
      console.log("Hit getMockRecipes");
      this.thisRecipesService.newMockDataAvailableEvent.subscribe((gotData) => {
        for (let currElementNo = 0; currElementNo < gotData.results.length; currElementNo++)
          this.loadedRecipes.results.push(gotData.results[currElementNo]);
        console.log("Mock Data arrived!  We got " + gotData.results.length.toString() + " records.");

      })

      this.isNewMockDataAvailEventSubscribed = true;
    }
    this.thisRecipesService.GetMockList();
  }
  
}
