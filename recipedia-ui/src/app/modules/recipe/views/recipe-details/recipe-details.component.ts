import {Component, OnInit} from '@angular/core';
import {RecipeResponse} from "../../../../services/models/recipe-response";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {RecipeService} from "../../../../services/services/recipe.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ReviewService} from "../../../../services/services/review.service";
import {UserResponse} from "../../../../services/models/user-response";
import {UserService} from "../../../../services/services/user.service";
import {ReviewRequest} from "../../../../services/models/review-request";
import {RatingComponent} from "../../component/rating/rating.component";
import {ReviewResponse} from "../../../../services/models/review-response";

@Component({
  selector: 'recipedia-recipe-details',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RatingComponent
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {

  private _recipe: RecipeResponse = {}
  private _authUser: UserResponse = {}
  private _review: ReviewRequest = {recipeId: -1}
  reviews: Array<ReviewResponse> | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private reviewService: ReviewService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    if (recipeId) {
      this.recipeService.findRecipeById({
        'recipe-id': recipeId
      }).subscribe({
        next: (recipe: RecipeResponse) => {
          this._recipe = recipe
          this.recipe.titleImage = ['data:image/jpg;base64,' + this.recipe.titleImage?.toString()];
        }
      })
    }
    this.userService.getAuthenticatedUser().subscribe({
      next: value => {
        this.authUser = value;
        this.authUser.profilePicture = ['data:image/jpg;base64,' + this.authUser.profilePicture?.toString()];
      }
    })
    this.findAllReviews();
    this.review.recipeId = recipeId;
  }

  saveReview() {
    this.reviewService.saveReview({
      body: this._review
    }).subscribe({
      next: () => {
        window.location.reload();
      },
      error: err => {
        window.alert(err.error.error)
      }
    })
  }

  private findAllReviews() {
    const recipeId = this.activatedRoute.snapshot.params['recipeId'];
    if (recipeId) {
      this.reviewService.findAllReviewsByRecipe({
          "recipe-id": recipeId
        }
      ).subscribe({
        next: (reviews) => {
          this.reviews = reviews
        }
      })
    }
  }

  get recipe(): RecipeResponse {
    return this._recipe;
  }

  set recipe(value: RecipeResponse) {
    this._recipe = value;
  }

  get authUser(): UserResponse {
    return this._authUser;
  }

  get review(): ReviewRequest {
    return this._review;
  }

  set review(value: ReviewRequest) {
    this._review = value;
  }

  set authUser(value: UserResponse) {
    this._authUser = value;
  }

  isReviewed() {
    return this.reviews?.some(review =>  review.createdBy?.id === this._authUser.id);
  }
}
