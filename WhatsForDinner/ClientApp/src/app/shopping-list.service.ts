import { Injectable } from '@angular/core';
import { Ingredients } from './recipe.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
 

  constructor() { }
  items: Ingredients[] = [];

  addToList(ingredient: Ingredients) {
    this.items.push(ingredient);
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
