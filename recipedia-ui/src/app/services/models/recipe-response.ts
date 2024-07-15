/* tslint:disable */
/* eslint-disable */
import {CookingStep} from './cooking-step';
import {Ingredient} from './ingredient';

export interface RecipeResponse {
  cookingSteps?: Array<CookingStep>;
  cookingTime?: string;
  createdBy?: number;
  description?: string;
  id?: number;
  ingredients?: Array<Ingredient>;
  preparationTime?: string;
  rate?: number;
  tags?: Array<'VEGAN' | 'SALAD' | 'SANDWICH' | 'SOUP' | 'SPICY' | 'DESSERT' | 'PASTA' | 'BBQ' | 'SEAFOOD' | 'HEALTHY' | 'EASY' | 'MEDITERRANEAN' | 'APPETIZER' | 'SNACK' | 'BAKED' | 'GRILLED' | 'QUICK' | 'KETO' | 'HOLIDAY' | 'PALEO'>;
  title?: string;
  titleImage?: Array<string>;
}

export function getAllPossibleTags(): Array<
'VEGAN' | 'SALAD' | 'SANDWICH' | 'SOUP' | 'SPICY' | 'DESSERT' |
'PASTA' | 'BBQ' | 'SEAFOOD' | 'HEALTHY' | 'EASY' | 'MEDITERRANEAN' |
'APPETIZER' | 'SNACK' | 'BAKED' | 'GRILLED' | 'QUICK' | 'KETO' |
'HOLIDAY' | 'PALEO'
> {
  return [
    'VEGAN', 'SALAD', 'SANDWICH', 'SOUP', 'SPICY', 'DESSERT', 'PASTA',
    'BBQ', 'SEAFOOD', 'HEALTHY', 'EASY', 'MEDITERRANEAN', 'APPETIZER',
    'SNACK', 'BAKED', 'GRILLED', 'QUICK', 'KETO', 'HOLIDAY', 'PALEO'
  ];
}
