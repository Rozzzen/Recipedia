/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {deleteRecipeById, DeleteRecipeById$Params} from '../fn/recipe/delete-recipe-by-id';
import {findAllRecipes, FindAllRecipes$Params} from '../fn/recipe/find-all-recipes';
import {findAllRecipesByAuthor, FindAllRecipesByAuthor$Params} from '../fn/recipe/find-all-recipes-by-author';
import {findRecipeById, FindRecipeById$Params} from '../fn/recipe/find-recipe-by-id';
import {PageResponseRecipeResponse} from '../models/page-response-recipe-response';
import {RecipeResponse} from '../models/recipe-response';
import {saveRecipe, SaveRecipe$Params} from '../fn/recipe/save-recipe';
import {uploadRecipeTitleImage, UploadRecipeTitleImage$Params} from '../fn/recipe/upload-recipe-title-image';

@Injectable({ providedIn: 'root' })
export class RecipeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllRecipes()` */
  static readonly FindAllRecipesPath = '/recipes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllRecipes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRecipes$Response(params?: FindAllRecipes$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRecipeResponse>> {
    return findAllRecipes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllRecipes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRecipes(params?: FindAllRecipes$Params, context?: HttpContext): Observable<PageResponseRecipeResponse> {
    return this.findAllRecipes$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRecipeResponse>): PageResponseRecipeResponse => r.body)
    );
  }

  /** Path part for operation `saveRecipe()` */
  static readonly SaveRecipePath = '/recipes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveRecipe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveRecipe$Response(params: SaveRecipe$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveRecipe(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveRecipe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveRecipe(params: SaveRecipe$Params, context?: HttpContext): Observable<number> {
    return this.saveRecipe$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadRecipeTitleImage()` */
  static readonly UploadRecipeTitleImagePath = '/recipes/image/{recipe-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadRecipeTitleImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadRecipeTitleImage$Response(params: UploadRecipeTitleImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadRecipeTitleImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadRecipeTitleImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadRecipeTitleImage(params: UploadRecipeTitleImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadRecipeTitleImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findRecipeById()` */
  static readonly FindRecipeByIdPath = '/recipes/{recipe-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findRecipeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRecipeById$Response(params: FindRecipeById$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeResponse>> {
    return findRecipeById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findRecipeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRecipeById(params: FindRecipeById$Params, context?: HttpContext): Observable<RecipeResponse> {
    return this.findRecipeById$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeResponse>): RecipeResponse => r.body)
    );
  }

  /** Path part for operation `deleteRecipeById()` */
  static readonly DeleteRecipeByIdPath = '/recipes/{recipe-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRecipeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRecipeById$Response(params: DeleteRecipeById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteRecipeById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteRecipeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRecipeById(params: DeleteRecipeById$Params, context?: HttpContext): Observable<void> {
    return this.deleteRecipeById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findAllRecipesByAuthor()` */
  static readonly FindAllRecipesByAuthorPath = '/recipes/author';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllRecipesByAuthor()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRecipesByAuthor$Response(params?: FindAllRecipesByAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRecipeResponse>> {
    return findAllRecipesByAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllRecipesByAuthor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRecipesByAuthor(params?: FindAllRecipesByAuthor$Params, context?: HttpContext): Observable<PageResponseRecipeResponse> {
    return this.findAllRecipesByAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRecipeResponse>): PageResponseRecipeResponse => r.body)
    );
  }

}
