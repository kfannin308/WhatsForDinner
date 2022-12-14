import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { UsersService } from './services/users.service';
import { AppSettingsService } from './services/appsettings.service';
import { FavoritesService } from './services/favorites.service';
import { RecipesService } from './services/recipe.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ShoppingListService, ShoppingList } from './services/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SearchRecipesComponent,
    FavoritesComponent,
    UserProfileComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    LoginComponent,
    IngredientsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    /*MatButtonToggle, */
    MatButtonToggleModule, 
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'search-recipes', component: SearchRecipesComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'shopping-list', component: ShoppingListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'recipe-details', component: RecipeDetailsComponent },
      { path: 'recipe-details/:id', component: RecipeDetailsComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [UsersService,AppSettingsService,FavoritesService,RecipesService,ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
