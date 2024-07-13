import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RecipeCardComponent} from "../../component/recipe-card/recipe-card.component";
import {PageResponseRecipeResponse} from "../../../../services/models/page-response-recipe-response";
import {RecipeService} from "../../../../services/services/recipe.service";
import {Router, RouterLink} from "@angular/router";
import {RecipeResponse} from "../../../../services/models/recipe-response";

@Component({
  selector: 'recipedia-my-recipes',
  standalone: true,
  imports: [
    NgForOf,
    RecipeCardComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent implements OnInit{

  recipeResponse: PageResponseRecipeResponse = {};
  page: number = 0;
  size: number = 5;

  constructor(private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAllRecipes();
  }

  private findAllRecipes() {
    this.recipeService.findAllRecipesByAuthor({
        page: this.page,
        size: this.size
      }
    ).subscribe({
      next: (recipes) => {
        this.recipeResponse = recipes
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllRecipes();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllRecipes();
  }

  goToPage(number: number) {
    this.page = number;
    this.findAllRecipes();
  }

  goToNextPage() {
    this.page++;
    this.findAllRecipes();
  }

  goToLastPage() {
    this.page = this.recipeResponse.totalPages as number - 1;
    this.findAllRecipes();
  }

  isLastPage(): boolean {
    return this.page == this.recipeResponse.totalPages as number - 1;
  }

  editRecipe(recipe: RecipeResponse) {
    this.router.navigate(['recipes', 'manage', recipe.id])
  }

  deleteRecipe(recipe: RecipeResponse) {
    this.recipeService.deleteRecipeById({"recipe-id": recipe.id || -1})
      .subscribe({
        next: () => {
          window.location.reload()
        }
      })
  }
}
