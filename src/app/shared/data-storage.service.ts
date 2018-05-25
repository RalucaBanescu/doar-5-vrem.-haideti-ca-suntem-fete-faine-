import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  
  FIREBASE_URL = 'https://proiectbdd.firebaseio.com/recipes.json';
  
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  

  storeRecipes() {
     const token = this.authService.getToken();

    return this.http.put(this.FIREBASE_URL, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.FIREBASE_URL)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
