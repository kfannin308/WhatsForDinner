import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  @Output() newMockDataAvailableEvent = new EventEmitter<RecipeResults>();
 
  private storedRecipeInfos: RecipeResults | any;
  private storedRandomInfos: RecipeInfo | any;
  private storedSingleRecipe: RecipeDetails | any;

  /* we are suing spoonaculars api https://spoonacular.com/food-api/docs#Search-Recipes-Complex
  * It returns its results in a json format 
  * this call only returns a small subset of data: id, title, image and image type
  * we authenticate using an apikey(the strange number you see in the middle of our url below)
  * we store these results in  RecipeInfos (see class below)*/
  /* returnsResults with a count wrapped around the RecipeInfos details */
  /* click here to see how results are sent:
   * https://api.spoonacular.com/recipes/complexSearch?apiKey=1528a19c369845658e657d2c1ccbdd87&number=40 */

  public GetListWithFilter(myFilterString: string) {
    let apiUrl: string = "https://api.spoonacular.com/recipes/complexSearch?apiKey=1528a19c369845658e657d2c1ccbdd87&number=40" + myFilterString;
    console.log("apiUrl:" + apiUrl);
    this.httpClient.get<RecipeResults>(apiUrl).subscribe((gotData) => {
      this.storedRecipeInfos = gotData;
      this.newFilteredRecipesAvailableEvent.emit(this.storedRecipeInfos);
    });
  }

  public id: number = 0;

  /* this is the api call to get extended details on when the user clicks the 'get details' button on the recipe list
   * we are suing spoonaculars api https://spoonacular.com/food-api/docs#Get-Recipe-Information
   * we pass the id in the middle of the url
  * It returns its results in a json format 
  * this call only returns a small subset of data: id, title, image and image type
  * we authenticate using an apikey(the strange number you see in the middle of our url below)
  * we store these results in  RecipeDetails (see class below)
  * we store the following fields even though much more details are sent in the json results:
  * id, title, readyInMinutes, servings, sourceUrl, image, summary, extendedIngredients, cuisines, and dishTypes*/
  /* click here to see the results
   * https://api.spoonacular.com/recipes/716426/information?apiKey=1528a19c369845658e657d2c1ccbdd87&includeNutrition=true */

  public GetRecipeDetails(id: number) {
    let thisId = id.toString();
    let apiURL: string = "https://api.spoonacular.com/recipes/" + thisId + "/information?apiKey=1528a19c369845658e657d2c1ccbdd87&includeNutrition=true";
    console.log("getDetails url:" + apiURL);
    this.httpClient.get<RecipeDetails>(apiURL).subscribe((gotData) => {
      this.storedSingleRecipe = gotData;
      this.newDetailAvailableEvent.emit(this.storedSingleRecipe);
    });
  }

  /* this was used to get data when the spoonacular api was down for a few days so we could keep working 
  public GetMockList() {
    let apiUrl: string = "https://gcmock.free.beeceptor.com";
                          
    console.log("Mock apiUrl:" + apiUrl);
    this.httpClient.get<RecipeResults>(apiUrl).subscribe((gotData) => {
      this.storedRecipeInfos = gotData;
      this.newMockDataAvailableEvent.emit(this.storedRecipeInfos);
    }); 

  } */

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


