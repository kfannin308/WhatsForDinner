import { Component, OnInit, Input } from '@angular/core';
import { RecipesService, RecipeDetails, RecipeInfo, RecipeResults, Ingredients } from '../services/recipe.service';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  items = this.shoppingListService.getItems();
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.getItems();
  }
  public getItems() {
    this.shoppingListService.getItems();


    console.log('Shopping List Items Total: ' + this.shoppingListService.items.length.toString());
  }
  public removeFromList(items: Ingredients[], item: Ingredients) {
    //console.log("hit removeFromCart code");
    console.log("hit removeFromList code " + item.name);
    /*this.items = this.cartService.getItems();
    for (var i = 0; i < items.length; i++) {
      console.log("hit loop" + i.toString()) + " " + item.id.toString();
      if (items[i].id == item.id) {
        items.splice(i, 1);
        window.alert('Your donut has been removed from the cart!');
        console.log("Idx: " + i.toString());
        return;
      }*/

  }

}
