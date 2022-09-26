import { Component, OnInit,Input} from '@angular/core';
import { RecipesService, RecipeInfo, RecipeResults, RecipeDetails } from '../services/recipe.service';
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
    this.id = Number.parseInt(idString!);
    
    this.GetDetails();


  }

  public GetDetails() {
    
    if (!this.isNewDetailsAvailableEventSubscribed) {
      this.thisRecipesService.newDetailAvailableEvent.subscribe((gotData) => {
        this.loadedDetails = gotData;
      })
      this.isNewDetailsAvailableEventSubscribed = true;
    }
    console.log("hit GetDetails Id: " + this.id);
    this.thisRecipesService.GetRecipeDetails(this.id);

  }

}
