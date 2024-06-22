/* tslint:disable */
/* eslint-disable */
import { CookingStep } from '../models/cooking-step';
import { Ingredient } from '../models/ingredient';
export interface RecipeRequest {
  cookingSteps: Array<CookingStep>;
  cookingTime: {
'seconds'?: number;
'zero'?: boolean;
'nano'?: number;
'negative'?: boolean;
'positive'?: boolean;
'units'?: Array<{
'durationEstimated'?: boolean;
'duration'?: {
'seconds'?: number;
'zero'?: boolean;
'nano'?: number;
'negative'?: boolean;
'positive'?: boolean;
};
'timeBased'?: boolean;
'dateBased'?: boolean;
}>;
};
  description: string;
  id?: number;
  ingredientList: Array<Ingredient>;
  preparationTime: {
'seconds'?: number;
'zero'?: boolean;
'nano'?: number;
'negative'?: boolean;
'positive'?: boolean;
'units'?: Array<{
'durationEstimated'?: boolean;
'duration'?: {
'seconds'?: number;
'zero'?: boolean;
'nano'?: number;
'negative'?: boolean;
'positive'?: boolean;
};
'timeBased'?: boolean;
'dateBased'?: boolean;
}>;
};
  tags?: Array<'KOREAN' | 'QUICK' | 'VEGAN' | 'BAKERY' | 'PASTA'>;
  title: string;
}
