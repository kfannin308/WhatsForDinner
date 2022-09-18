import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  constructor(private httpClient: HttpClient) {
    console.log(" Recipes Service Created");
  }

  @Output() newRecipesAvailableEvent = new EventEmitter<RecipeResults>();
  @Output() newDetailAvailableEvent = new EventEmitter<RecipeDetails>();
  @Output() newFilteredRecipesAvailableEvent = new EventEmitter<RecipeResults>();
  @Output() newRandomRecipesAvailableEvent = new EventEmitter<RecipeResults>();

  private storedRecipeInfos: RecipeResults | any;

  // private storedRecipeResults: RecipeResults = new RecipeResults;
  private storedSingleRecipe: RecipeDetails = new RecipeDetails;

 /*
  public GetInfoFromServer() {
    let apiUrl: string = "https://api.spoonacular.com/recipes/complexSearch?apiKey=1528a19c369845658e657d2c1ccbdd87&number=9";
    this.httpClient.get<RecipeResults>(apiUrl).subscribe((gotData) => {
      console.log("Hit GetInfoFromServer");
      this.storedRecipeInfos = gotData;
      this.newRecipesAvailableEvent.emit(this.storedRecipeInfos);
    });
  }*/

  public GetListWithFilter(myFilterString: string) {
    let apiUrl: string = "https://api.spoonacular.com/recipes/complexSearch?apiKey=1528a19c369845658e657d2c1ccbdd87&number=9" + myFilterString;
    console.log("apiUrl:" + apiUrl);
    this.httpClient.get<RecipeResults>(apiUrl).subscribe((gotData) => {
      this.storedRecipeInfos = gotData;
      this.newFilteredRecipesAvailableEvent.emit(this.storedRecipeInfos);
    });
  }

  public GetListRandom() {
    let apiUrl: string = "https://api.spoonacular.com/recipes/random?apiKey=1528a19c369845658e657d2c1ccbdd87&number=9";
    console.log("apiUrl:" + apiUrl);
    this.httpClient.get<RecipeResults>(apiUrl).subscribe((gotData) => {
      this.storedRecipeInfos = gotData;
      this.newRandomRecipesAvailableEvent.emit(this.storedRecipeInfos);
    });
  }

  public id: number = 0;
  
  
  public GetRecipeDetails(id: number) {
    let apiURL: string = "https://grandcircusco.github.io/demo-apis/donuts/" + id.toString() + ".json";
    this.httpClient.get<RecipeDetails>(apiURL).subscribe((gotData) => {
      this.storedSingleRecipe = gotData;
      this.newDetailAvailableEvent.emit(this.storedSingleRecipe);
    });
  }

}
export class RecipeResults {
  public count: number = 0;
  public results: RecipeInfo[] = [];
}

export class RecipeInfo {
  public id: number = 0;
  public title: string = "";
  public image: string = "";
  public imageType: string = "";

}
export class RecipeDetails {
  public id: number = 0;
  public title: string = "";
  public readyInMinutes: number = 0;
  public servings: number = 0;
  public sourceUrl: string = ""
  public image: string = ""
  public summary: string = "";
  public extendedIngredients: Ingredients[] = [];
  public cuisines: string = "";
  public dishTypes: string = ""
}

export class Ingredients {
  public id: number = 0;
  public aisle: string = "";
  public name: string = "";
  public amount: number = 0;
  public unit: string = "";
}

