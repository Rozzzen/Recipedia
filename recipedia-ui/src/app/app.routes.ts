import {Routes} from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {RegisterComponent} from "./views/register/register.component";
import {ActivateAccountComponent} from "./views/activate-account/activate-account.component";
import {authGuard} from "./services/guard/auth.guard";
import {ManageAccountComponent} from "./views/manage-account/manage-account.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'manage-account',
    component: ManageAccountComponent,
    canActivate: [authGuard]
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'recipes',
    loadChildren: () => import('./modules/recipe/recipe.module').then(m => m.RecipeModule),
    canActivate: [authGuard]
  },
];
