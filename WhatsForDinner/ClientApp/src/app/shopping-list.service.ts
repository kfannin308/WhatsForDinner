import { Injectable } from '@angular/core';
import { Ingredients } from './services/recipe.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {


  constructor() { }
  items: Ingredients[] = [];

  addToList(ingredient: Ingredients) {
    let found = false;
    for (let item of this.items) {
        if (item.id == ingredient.id) {
          found = true;
          console.log("shoppinglist: " + ingredient.id + " " + item.id + " " + item.name + found.toString());
          if (found == true) {
            item.amount += ingredient.amount;
          }
        }
    }
    if (!found) {
      this.items.push(ingredient);
    }
    
  }
  getItems() {
    console.log("hit getItems");
    return this.items;

  }

}

export class ShoppingList {
  public id: number = 0;
  public aisle: string = "";
  public name: string = "";
  public amount: number = 0;
  public unit: string = "";
}
