import { Component, OnInit } from '@angular/core';
import { Favorites, FavoritesService } from '../services/favorites.service';
import { Users, UsersService } from '../services/users.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  private _favoriteService: FavoritesService;
  private _userService: UsersService;
  favorites: Favorites[] = [];
  currentUser: Users | undefined;

  constructor(favoriteService: FavoritesService, userService: UsersService) {
    this._favoriteService = favoriteService;
    this._userService = userService;
  }


  ngOnInit(): void {
    this._userService.currentUser.subscribe((user: Users | null) => {
      if (user != null)
        this.currentUser = user;
    })
    if (this.currentUser != null && this.currentUser.userID != null) {
      this.favorites = this._favoriteService.GetFavoritesByUser(this.currentUser?.userID.toString());

    }
  }

}
