import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RecipeService} from "../../../../services/services/recipe.service";
import {getAllPossibleTags, RecipeResponse} from "../../../../services/models/recipe-response";
import {RecipeRequest} from "../../../../services/models/recipe-request";
import {FileUploadService} from "../../../../services/file-upload/file-upload.service";
import console from "node:console";

@Component({
  selector: 'recipedia-manage-recipe',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.scss'
})
export class ManageRecipeComponent implements OnInit {

  errorMsg: Array<string> = [];
  recipeForm: FormGroup;
  defaultRecipeTitleImage: string = "/uploads/recipes/no-img.jpeg"

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    protected fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.recipeForm = this.formBuilder.group({
      title: [''],
      description: [''],
      preparationTime: [''],
      cookingTime: [''],
      ingredients: this.formBuilder.array([
        this.createIngredient()]),
      cookingSteps: this.formBuilder.array([
        this.createStep()]),
      tags: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    const recipeId = this.activatedRoute.snapshot.params['recipeId']
    if (recipeId) {
      this.recipeService.findRecipeById({
        'recipe-id': recipeId
      }).subscribe({
        next: (recipe: RecipeResponse) => {
          this.recipeForm = this.formBuilder.group({
            id: recipeId,
            title: recipe.title as string,
            description: recipe.description as string,
            preparationTime: recipe.preparationTime as string,
            cookingTime: recipe.cookingTime as string,
            ingredients: this.formBuilder.array((recipe.ingredients || []).map(
              ingredient => this.formBuilder.group({
                name: ingredient.name,
                quantity: ingredient.quantity
              }))),
            cookingSteps: this.formBuilder.array((recipe.cookingSteps || []).map(
              step => this.formBuilder.group({
                text: step.text
              }))),
            tags: this.formBuilder.array(recipe.tags || [])
          })
          if (recipe.titleImage) {
            this.fileUploadService.selectedPictureFile = this.fileUploadService.base64ToFile(recipe.titleImage.toString())
            this.fileUploadService.selectedPictureString = 'data:image/jpg;base64,' + recipe.titleImage
          }
        },
        error: err => {
          console.log(err);
          this.errorMsg = err.error.validationErrors;
          window.scroll(0, 0)
        }
      })
    }
  }

  saveRecipe() {
    let recipeResponse: RecipeRequest = this.recipeForm.value;
    recipeResponse.cookingSteps?.forEach((value, index) => {
      value.number = index + 1;
    })
    this.recipeService.saveRecipe({
      body: recipeResponse
    }).subscribe({
      next: (recipeId) => {
        if (this.fileUploadService.getSelectedPictureFile()) {
          this.recipeService.uploadRecipeTitleImage({
            'recipe-id': recipeId,
            body: {
              file: this.fileUploadService.getSelectedPictureFile()
            }
          }).subscribe({
            next: () => {
              this.router.navigate(['recipes/my-recipes'])
            },
            error: err => {
              this.errorMsg.push(err.error.error)
              window.scroll(0, 0)
            }
          })
        }
        else this.router.navigate(['recipes/my-recipes'])
      },
      error: err => {
        this.errorMsg = err.error.validationErrors;
        window.scroll(0, 0)
      }
    })
  }

  createStep(): FormGroup {
    return this.formBuilder.group({
      text: ['']
    });
  }

  get cookingSteps(): FormArray {
    return this.recipeForm.get('cookingSteps') as FormArray;
  }

  addStep(): void {
    this.cookingSteps.push(this.createStep());
  }

  removeStep(index: number): void {
    this.cookingSteps.removeAt(index);
  }

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      quantity: ['']
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  get tags(): FormArray {
    return this.recipeForm.get('tags') as FormArray;
  }

  get possibleTags(): Array<string> {
    return getAllPossibleTags().filter(item => !this.tags.value.includes(item))
  }

  createTag($event: any): void {
    const control = this.recipeForm.get('tags') as FormArray
    control.push(this.formBuilder.control($event.target.text));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  protected readonly console = console;
}
