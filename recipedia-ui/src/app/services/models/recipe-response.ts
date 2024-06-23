/* tslint:disable */
/* eslint-disable */
import { CookingStep } from './cooking-step';
import { Ingredient } from './ingredient';
export interface RecipeResponse {
  cookingSteps?: Array<CookingStep>;
  cookingTime?: string;
  description?: string;
  id?: number;
  ingredientList?: Array<Ingredient>;
  preparationTime?: string;
  tags?: Array<'KOREAN' | 'QUICK' | 'VEGAN' | 'BAKERY' | 'PASTA'>;
  title?: string;
}
