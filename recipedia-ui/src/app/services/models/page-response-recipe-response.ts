/* tslint:disable */
/* eslint-disable */
import { RecipeResponse } from './recipe-response';
export interface PageResponseRecipeResponse {
  content?: Array<RecipeResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
