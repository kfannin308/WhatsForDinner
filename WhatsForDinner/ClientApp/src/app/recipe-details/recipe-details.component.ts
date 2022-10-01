import { Component, OnInit,Input, Output} from '@angular/core';
import { RecipesService, RecipeInfo, RecipeResults, RecipeDetails } from '../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService, ShoppingList } from '../shopping-list.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private _Activatedroute: ActivatedRoute, private thisRecipesService: RecipesService,
              private thisShoppingListService: ShoppingListService ) {

  }

  public loadedDetails: RecipeDetails = new RecipeDetails();
  private isNewDetailsAvailableEventSubscribed: boolean = false;

 

  @Input() public id: number = 0;
  @Input() public title: string = "";
  @Input() public readyInMinutes: number = 0;
  @Input() public servings: number = 0;
  @Input() public sourceUrl: string = ""
  @Input() public image: string = ""
  @Input() public summary: string = "";
  @Input() public cuisines: string = "";
  @Input() public dishTypes: string = ""

  ngOnInit(): void {
    
    let idString: string | null = "";
    idString = this._Activatedroute.snapshot.paramMap.get("id");
    console.log("onInit: idstring =" + idString);
    console.log(typeof Number(idString));
    this.id = Number.parseInt(idString!);
    console.log("onInit: ID =" + this.id);
    this.GetDetails();


  }

  public GetDetails() {
    console.log("getDetails Id: " + this.id);
    if (!this.isNewDetailsAvailableEventSubscribed) {
      this.thisRecipesService.newDetailAvailableEvent.subscribe((gotData) => {
        this.loadedDetails = gotData;
      })
      this.isNewDetailsAvailableEventSubscribed = true;
    }
    console.log("hit GetDetails Id: " + this.id);
    this.thisRecipesService.GetRecipeDetails(this.id);

  }
  public loadIngredients() {
    for (let curr of this.loadedDetails.extendedIngredients) {

      this.thisShoppingListService.addToList(curr);

    }
      window.alert('Your ingredients have been added to the Shopping List! Total Items in Shopping List:' +
        this.thisShoppingListService.items.length.toString());
  }
}
