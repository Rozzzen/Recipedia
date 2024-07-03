import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../../../services/services/recipe.service";
import {Router, RouterLink} from "@angular/router";
import {PageResponseRecipeResponse} from "../../../../services/models/page-response-recipe-response";
import {NgForOf} from "@angular/common";
import {RecipeCardComponent} from "../../component/recipe-card/recipe-card.component";

@Component({
  selector: 'recipedia-recipe-list',
  standalone: true,
  imports: [
    NgForOf,
    RecipeCardComponent,
    RouterLink
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

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
    this.recipeService.findAllRecipes({
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
}
