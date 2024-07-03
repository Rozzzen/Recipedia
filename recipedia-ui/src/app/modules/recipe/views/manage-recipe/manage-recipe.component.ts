import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RecipeService} from "../../../../services/services/recipe.service";
import {RecipeResponse} from "../../../../services/models/recipe-response";
import {RecipeRequest} from "../../../../services/models/recipe-request";

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
  selectedPictureFile: any;
  selectedPictureString: string | undefined;
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
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
        this.createStep()])
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
              })))
          })
          if (recipe.titleImage) {
            this.selectedPictureFile = this.base64ToFile(recipe.titleImage.toString())
            this.selectedPictureString = 'data:image/jpg;base64,' + recipe.titleImage
          }
        }
      })
    }
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

  onFileSelected($event: any) {
    this.selectedPictureFile = $event.target.files[0];
    console.log(this.selectedPictureFile)
    if (this.selectedPictureFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPictureString = reader.result as string;
      };
      reader.readAsDataURL(this.selectedPictureFile);
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
        this.recipeService.uploadRecipeTitleImage({
          'recipe-id': recipeId,
          body: {
            file: this.selectedPictureFile
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['recipes/my-recipes'])
          },
          error: err => this.errorMsg.push(err.error.error)
        })
      },
      error: err => {
        console.log(err.errorMsg);
        this.errorMsg = err.error.validationErrors;
      }
    })
  }

  base64ToFile(base64String: string): File {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'image/jpeg'});

    return new File([blob], 'temporary-image' + base64String.substring(0, 10), {type: 'image/jpeg'});
  }
}
