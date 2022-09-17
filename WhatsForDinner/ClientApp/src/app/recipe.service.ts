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

  private storedRecipeInfos: RecipeResults | any;
  // private storedRecipeResults: RecipeResults = new RecipeResults;
  // private storedSingleRecipe: RecipeDetails = new RecipeDetails;

  public GetListWithFilter(foodTypes:string) {
    let apiUrl: string = "https://api.spoonacular.com/recipes/complexSearch?apiKey=1528a19c369845658e657d2c1ccbdd87&number=9&query="+foodTypes;
    this.httpClient.get<RecipeResults>(apiUrl).subscribe((gotData) => {
      this.storedRecipeInfos = gotData;
      this.newFilteredRecipesAvailableEvent.emit(this.storedRecipeInfos);
    });
  }

  public GetInfoFromServer() {
    let apiUrl: string = "https://api.spoonacular.com/recipes/complexSearch?apiKey=1528a19c369845658e657d2c1ccbdd87&number=5";
    this.httpClient.get<RecipeResults>(apiUrl).subscribe((gotData) => {
      console.log("Hit GetInfoFromServer");
      this.storedRecipeInfos = gotData;
      this.newRecipesAvailableEvent.emit(this.storedRecipeInfos);
    });
  }
  public id: number = 0;



  /*
  public GetRecipeDetails(id: number) {
    let apiURL: string = "https://grandcircusco.github.io/demo-apis/donuts/" + id.toString() + ".json";
    this.httpClient.get<Details>(apiURL).subscribe((gotData) => {
      this.storedSingleDonut = gotData;
      this.newDetailAvailableEvent.emit(this.storedSingleDonut);
    });
  }
*/
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

  public extendedIngredients: Ingredients[] = [];
}

export class Ingredients {
  public id: number = 0;
  public aisle: string = "";
  public name: string = "";
  public amount: number = 0;
  public unit: string = "";
}

