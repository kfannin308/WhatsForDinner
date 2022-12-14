import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
//import { CartService } from '../cart.service';

import { ShoppingListService, ShoppingList } from '../services/shopping-list.service';
import { RecipesService, RecipeDetails, RecipeInfo, RecipeResults } from '../services/recipe.service';
import { FavoritesService } from 'src/app/services/favorites.service'
import { UsersService } from '../services/users.service'
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
  

  @Input() public loadedDetails: RecipeDetails = new RecipeDetails();   // this allows form data to be collected from the HTML. 

  constructor(private thisRecipesService: RecipesService, private favoritesService: FavoritesService,
    private usersService: UsersService, @Inject('BASE_URL') baseUrl: string) {
  }

  ngOnInit(): void {
    
  }

  /* clear search results */
  clearRecipeList() {
    this.loadedRecipes.results = [];
    
    return this.loadedRecipes;
  }
  
  /* function called when search recipes button is click
   it subscribes to the call to the api in the recipes service*/
  
  public getListwithFilter(myType: string, wordSearch: string, cuisine: string, maxReadyTime: number) {
    // The order is important here.  If we subscribe FIRST, we can guarantee we will receive
    // all data provided by the event.  If we subscribe SECOND, we may not.

    console.log("filters: " + this.myType + "  " + this.myWordSearch + "  " + this.myCuisine + " " + this.maxReadyTime);
    /* figuring out the filters to add to url */
    if (!this.isNewFilteredRecipeAvailEventSubscribed) {
      this.thisRecipesService.newFilteredRecipesAvailableEvent.subscribe((recipes) => {
        this.loadedRecipes = recipes;
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
    console.log("myType: " + this.myType);
    console.log("myCuisine: " + this.myCuisine);
    console.log("myWordSearch: " + this.myWordSearch);
    console.log("maxReadyTime: " + this.maxReadyTime);
    console.log("FilterString: " + this.filterString);
    this.thisRecipesService.GetListWithFilter(this.filterString);
    this.myType = "";
    this.myCuisine = "";
    this.myWordSearch = "";
    this.filterString = "";
  }

 /* used to get data when spoonacular's api was down 
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
  }*/
  
}
