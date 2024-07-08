import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RecipeResponse} from "../../../../services/models/recipe-response";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RatingComponent} from "../rating/rating.component";

@Component({
  selector: 'recipedia-recipe-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RatingComponent,
    NgIf
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  private _recipe: RecipeResponse = {};
  private _manageable = false;
  defaultTitleImage = "/uploads/recipes/no-img.jpeg"

  get recipe(): RecipeResponse {
    return this._recipe;
  }

  @Input()
  set recipe(value: RecipeResponse) {
    this._recipe = value;
  }

  get recipeCover(): string | undefined {
    if(this._recipe.titleImage) {
      return 'data:image/jpg;base64,' + this._recipe.titleImage;
    }
    return this.defaultTitleImage;
  }

  get manageable(): boolean {
    return this._manageable;
  }

  @Input()
  set manageable(value: boolean) {
    this._manageable = value;
  }

  @Output() private edit: EventEmitter<RecipeResponse> = new EventEmitter<RecipeResponse>();
  onEdit() {
    this.edit.emit(this._recipe);
  }

  @Output() private delete: EventEmitter<RecipeResponse> = new EventEmitter<RecipeResponse>();
  onDelete() {
    this.delete.emit(this._recipe)
  }
}
