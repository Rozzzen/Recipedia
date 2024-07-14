import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../../../services/services/recipe.service";
import {RouterLink} from "@angular/router";
import {PageResponseRecipeResponse} from "../../../../services/models/page-response-recipe-response";
import {NgForOf, NgIf} from "@angular/common";
import {RecipeCardComponent} from "../../component/recipe-card/recipe-card.component";
import {SearchBarService} from "../../../../services/search-bar/search-bar.service";

@Component({
  selector: 'recipedia-recipe-list',
  standalone: true,
  imports: [
    NgForOf,
    RecipeCardComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

  recipeResponse: PageResponseRecipeResponse = {};
  page: number = 0;
  size: number = 5;

  constructor(private recipeService: RecipeService,
              protected searchBarService: SearchBarService) {
  }

  ngOnInit(): void {
    this.findAllRecipes();
    this.searchBarService.searchBarUpdate.subscribe(() => {
      this.findAllRecipes()
    })
  }

  private findAllRecipes() {
    this.recipeService.findAllRecipes({
        page: this.page,
        size: this.size,
        search: this.searchBarService.currentSearchQuery
      }
    ).subscribe({
      next: (recipes) => {
        this.recipeResponse = recipes
      }
    })
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllRecipes();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllRecipes();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllRecipes();
  }

  goToLastPage() {
    this.page = this.recipeResponse.totalPages as number - 1;
    this.findAllRecipes();
  }

  goToNextPage() {
    this.page++;
    this.findAllRecipes();
  }

  get isLastPage() {
    return this.page === this.recipeResponse.totalPages as number - 1;
  }
}
