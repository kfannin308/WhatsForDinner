import { Component, OnInit,Input, Output} from '@angular/core';
import { RecipesService, RecipeInfo, RecipeResults, RecipeDetails } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private _Activatedroute: ActivatedRoute, private thisRecipesService: RecipesService) {

  }

  public loadedDetails: RecipeDetails = new RecipeDetails();
  private isNewDetailsAvailableEventSubscribed: boolean = false;

 

  @Input() public id: number = 0;
 /* @Output() public loadedDetails: RecipeDetails = new RecipeDetails(); */
 

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
   
    this.thisRecipesService.GetRecipeDetails(this.id);
   
  }

}
