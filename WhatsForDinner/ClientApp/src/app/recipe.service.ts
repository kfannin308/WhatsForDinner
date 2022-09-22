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
    let apiURL: string = "https://api.spoonacular.com/recipes/716429/information?apiKey=1528a19c369845658e657d2c1ccbdd87&includeNutrition=true" ;
    this.httpClient.get<RecipeDetails>(apiURL).subscribe((gotData) => {
      this.storedSingleRecipe = gotData;
      this.newDetailAvailableEvent.emit(this.storedSingleRecipe);
    });
  }
  
  public GetMockList() {
    let apiUrl: string = "https://gcmock.free.beeceptor.com";
                          
    console.log("Mock apiUrl:" + apiUrl);
    this.httpClient.get<RecipeResults>(apiUrl).subscribe((gotData) => {
      this.storedRecipeInfos = gotData;
      this.newMockDataAvailableEvent.emit(this.storedRecipeInfos);
    }); 
    
    

  }

}

export class RecipeResults {
  public count: number = 0;
  public results: RecipeInfo[] = [];
}
/*
export class MockRecipeService {
  private resultsList: RecipeResults[] =
    [
      {
        count: 2,
        results: [{
          id: 1,
          title: "Mushroom Carbonara",
          image: "https://www.eatthis.com/wp-content/uploads/sites/4/2020/08/weldon-owen-gluten-free-cover.jpg?quality=82&strip=1&w=970",
          imageType: "jpeg"
        }]
      },
      {
        count: 2,
        results: [{
          id: 2,
          title: "Salad",
          image: "https://picjumbo.com/wp-content/uploads/korean-bibimbap-flatlay-1080x696.jpg",
          imageType: "jpeg"
        }]
      
      }
      
    ];
  /*
  public getMockData(): RecipeResults[] {
    return this.resultsList;
  }
  constructor() { }
}*/
  /*
  private recipeList: RecipeInfo[] =
   [
        {
          id: 1,
          title: "Mushroom Carbonara",
          image: "https://www.eatthis.com/wp-content/uploads/sites/4/2020/08/weldon-owen-gluten-free-cover.jpg?quality=82&strip=1&w=970",
          imageType: "jpeg"
        },
        {
          id: 2,
          title: "Salad",
          image: "https://picjumbo.com/wp-content/uploads/korean-bibimbap-flatlay-1080x696.jpg",
          imageType: "jpeg"
        }

    ];
    */
 
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


