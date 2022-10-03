import { Component, OnInit, Input } from '@angular/core';
import { RecipesService, RecipeDetails, RecipeInfo, RecipeResults, Ingredients } from '../services/recipe.service';
import { Users, UsersService } from '../services/users.service';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  items: Ingredients[];
  _userService: UsersService;
  currentUser: Users;
  constructor(private shoppingListService: ShoppingListService, userService: UsersService) {
    this._userService = userService;
  }

  ngOnInit(): void {
    this._userService.currentUserStream.subscribe((user: Users | null) => {   // we are using the userservice to subscribe to the current user stream which knows who the current user is to then set it to our instance variable this.currentUser
      if (user != null)
        this.currentUser = user;  // this initializing/setting the current user
    });
    this.items = this.getItems();
  }
  public findItem(myId: number) {

  }

  public getItems() {
    return this.shoppingListService.getItems(this.currentUser);

  }

  public removeFromList(items: Ingredients[], item: Ingredients) {
    console.log("hit removeFromList code " + item.name);
    this.items = this.shoppingListService.getItems(this.currentUser);
    for (var i = 0; i < items.length; i++) {
      console.log("hit loop" + i.toString()) + " " + item.id.toString();
      if (items[i].id == item.id) {
        items.splice(i, 1);
        window.alert('Your item has been removed from the shopping list!');
        console.log("Idx: " + i.toString());
        return;
      }
    }
  }

  public printPage() {
    console.log("hit print");
    //Get the print and remove buttons and put it into a variable
    var printButton = document.getElementById("printpagebutton");
    var removeButton = document.getElementById("removebutton");
    //Set the buttons visibility to 'hidden'
    printButton.style.visibility = 'hidden';
    removeButton.style.visibility = 'hidden';
    //Print the page content
    window.print();
    //Set the print button to 'visible' again
    //[Delete this line if you want it to stay hidden after printing]
    printButton.style.visibility = 'visible';
    removeButton.style.visibility = 'visible';
  }
}



