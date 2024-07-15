import {Component, EventEmitter, OnInit} from '@angular/core';
import {RecipeService} from "../../../../services/services/recipe.service";
import {RouterLink} from "@angular/router";
import {PageResponseRecipeResponse} from "../../../../services/models/page-response-recipe-response";
import {NgForOf, NgIf} from "@angular/common";
import {RecipeCardComponent} from "../../component/recipe-card/recipe-card.component";
import {SearchBarService} from "../../../../services/search-bar/search-bar.service";
import {getAllPossibleTags} from "../../../../services/models/recipe-response";

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
  tagArray: any = [];
  tagUpdate = new EventEmitter();
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
    this.tagUpdate.subscribe(() => {
      this.findAllRecipes();
    })
  }

  private findAllRecipes() {
    this.recipeService.findAllRecipes({
        page: this.page,
        size: this.size,
        search: this.searchBarService.currentSearchQuery,
        tags: this.tagArray
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

  protected readonly getAllPossibleTags = getAllPossibleTags;

  onCheckBoxChange($event: any) {
    const value = $event.target.value
    if ($event.target.checked) {
      this.tagArray.push(value);
    } else {
      const index = this.tagArray.indexOf(value)
      this.tagArray.splice(index, 1);
    }
    this.tagUpdate.emit()
  }
}
