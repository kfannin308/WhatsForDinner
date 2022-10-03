import { Injectable } from '@angular/core';
import { Ingredients } from './services/recipe.service';
import { Users, UsersService } from './services/users.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  _userService: UsersService;

  constructor(userService: UsersService) {
    this._userService = userService;
  }
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

  /* clear list when logging out */
  clearItems() {
    console.log("hit clearItems");
      this.items= [];
      return this.items;
  }
  getItems(user: Users): Ingredients[] {
    if (user != null || user != undefined) {

      return this.items;
    }
    else {
      return [];
    }

  }
}

export class ShoppingList {
  public id: number = 0;
  public aisle: string = "";
  public name: string = "";
  public amount: number = 0;
  public unit: string = "";
}
