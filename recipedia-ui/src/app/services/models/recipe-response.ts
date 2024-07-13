/* tslint:disable */
/* eslint-disable */
import {CookingStep} from '../models/cooking-step';
import {Ingredient} from '../models/ingredient';

export interface RecipeResponse {
  cookingSteps?: Array<CookingStep>;
  cookingTime?: string;
  createdBy?: number;
  description?: string;
  id?: number;
  ingredients?: Array<Ingredient>;
  preparationTime?: string;
  rate?: number;
  tags?: Array<'KOREAN' | 'SALAD' | 'QUICK' | 'VEGAN' | 'ITALIAN' | 'VEGETARIAN' | 'SOUP' | 'BAKERY' | 'PASTA' | 'CHICKEN'>;
  title?: string;
  titleImage?: Array<string>;
}
