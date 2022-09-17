import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
//import { CartService } from '../cart.service';
import { RecipesService, RecipeInfo, RecipeResults } from '../recipe.service';
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
  public myTypes: string = "";
  public wordSearch: string = "";
  public cuisine: string = "";
  public restrictions: string = "";

  constructor(private thisRecipesService: RecipesService,  /* private cartService: CartService */) {
  }


  ngOnInit(): void {

   
  }
 
  clearRecipeList() {
    this.loadedRecipes.results = [];
    /*for (let currElementNo = 0; currElementNo < this.loadedRecipes.results.length; currElementNo++) {
      delete this.loadedRecipes.results[currElementNo];
    }*/
    return this.loadedRecipes;
  }
  public getRecipeList() {
    // The order is important here.  If we subscribe FIRST, we can guarantee we will receive
    // all data provided by the event.  If we subscribe SECOND, we may not.
   
    if (!this.isNewRecipeAvailableEventSubscribed) {
      console.log("Hit getRecipeLis 1");
      this.thisRecipesService.newRecipesAvailableEvent.subscribe((gotData) => {
        for (let currElementNo = 0; currElementNo < gotData.results.length; currElementNo++)
          this.loadedRecipes.results.push(gotData.results[currElementNo]);
        console.log("Data arrived!  We got " + gotData.results.length.toString() + " records.");

      })
      this.isNewRecipeAvailableEventSubscribed = true;
    }
    this.thisRecipesService.GetInfoFromServer();
  }
  

  public getListwithFilter(myTypes:string){
    // The order is important here.  If we subscribe FIRST, we can guarantee we will receive
    // all data provided by the event.  If we subscribe SECOND, we may not.
    
    console.log("Types: " + myTypes);
    if (!this.isNewFilteredRecipeAvailEventSubscribed) {
      this.thisRecipesService.newFilteredRecipesAvailableEvent.subscribe((gotData) => {
        for (let currElementNo = 0; currElementNo < gotData.results.length; currElementNo++)
          this.loadedRecipes.results.push(gotData.results[currElementNo]);
        console.log("Data arrived!  We got " + gotData.results.length.toString() + " records.");

      })
      this.isNewFilteredRecipeAvailEventSubscribed = true;
    }
    this.thisRecipesService.GetListWithFilter(myTypes);
  }

}

