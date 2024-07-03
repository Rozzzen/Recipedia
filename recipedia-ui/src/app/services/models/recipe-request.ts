/* tslint:disable */
/* eslint-disable */
import {CookingStep} from '../models/cooking-step';
import {Ingredient} from '../models/ingredient';

export interface RecipeRequest {
  cookingSteps: Array<CookingStep>;
  cookingTime: string;
  description: string;
  id?: number;
  ingredients: Array<Ingredient>;
  preparationTime: string;
  tags?: Array<'KOREAN' | 'SALAD' | 'QUICK' | 'VEGAN' | 'ITALIAN' | 'VEGETARIAN' | 'SOUP' | 'BAKERY' | 'PASTA' | 'CHICKEN'>;
  title: string;
}
