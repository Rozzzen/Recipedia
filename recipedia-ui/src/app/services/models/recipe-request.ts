/* tslint:disable */
/* eslint-disable */
import {CookingStep} from './cooking-step';
import {Ingredient} from './ingredient';

export interface RecipeRequest {
  cookingSteps: Array<CookingStep>;
  cookingTime: string;
  description: string;
  id?: number;
  ingredients: Array<Ingredient>;
  preparationTime: string;
  tags?: Array<'VEGAN' | 'SALAD' | 'SANDWICH' | 'SOUP' | 'SPICY' | 'DESSERT' | 'PASTA' | 'BBQ' | 'SEAFOOD' | 'HEALTHY' | 'EASY' | 'MEDITERRANEAN' | 'APPETIZER' | 'SNACK' | 'BAKED' | 'GRILLED' | 'QUICK' | 'KETO' | 'HOLIDAY' | 'PALEO'>;
  title: string;
}
