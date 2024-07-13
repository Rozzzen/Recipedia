import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./views/main/main.component";
import {RecipeListComponent} from "./views/recipe-list/recipe-list.component";
import {ManageRecipeComponent} from "./views/manage-recipe/manage-recipe.component";
import {MyRecipesComponent} from "./views/my-recipes/my-recipes.component";
import {authGuard} from "../../services/guard/auth.guard";
import {RecipeDetailsComponent} from "./views/recipe-details/recipe-details.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: RecipeListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageRecipeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:recipeId',
        component: ManageRecipeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'details/:recipeId',
        component: RecipeDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-recipes',
        component: MyRecipesComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {
}
