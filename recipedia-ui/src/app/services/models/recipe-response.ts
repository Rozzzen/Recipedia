/* tslint:disable */
/* eslint-disable */
import { CookingStep } from '../models/cooking-step';
import { Ingredient } from '../models/ingredient';
export interface RecipeResponse {
  cookingSteps?: Array<CookingStep>;
  cookingTime?: {
'seconds'?: number;
'zero'?: boolean;
'nano'?: number;
'negative'?: boolean;
'positive'?: boolean;
'units'?: Array<{
'durationEstimated'?: boolean;
'timeBased'?: boolean;
'dateBased'?: boolean;
}>;
};
  description?: string;
  id?: number;
  ingredientList?: Array<Ingredient>;
  preparationTime?: {
'seconds'?: number;
'zero'?: boolean;
'nano'?: number;
'negative'?: boolean;
'positive'?: boolean;
'units'?: Array<{
'durationEstimated'?: boolean;
'timeBased'?: boolean;
'dateBased'?: boolean;
}>;
};
  tags?: Array<'KOREAN' | 'QUICK' | 'VEGAN' | 'BAKERY' | 'PASTA'>;
  title?: string;
}
