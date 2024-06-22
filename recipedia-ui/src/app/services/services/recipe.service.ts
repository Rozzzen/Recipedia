/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllRecipes } from '../fn/recipe/find-all-recipes';
import { FindAllRecipes$Params } from '../fn/recipe/find-all-recipes';
import { findAllRecipesByAuthor } from '../fn/recipe/find-all-recipes-by-author';
import { FindAllRecipesByAuthor$Params } from '../fn/recipe/find-all-recipes-by-author';
import { findRecipeById } from '../fn/recipe/find-recipe-by-id';
import { FindRecipeById$Params } from '../fn/recipe/find-recipe-by-id';
import { PageResponseRecipeResponse } from '../models/page-response-recipe-response';
import { RecipeResponse } from '../models/recipe-response';
import { saveRecipe } from '../fn/recipe/save-recipe';
import { SaveRecipe$Params } from '../fn/recipe/save-recipe';
import { uploadRecipeStepImage } from '../fn/recipe/upload-recipe-step-image';
import { UploadRecipeStepImage$Params } from '../fn/recipe/upload-recipe-step-image';

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

  /** Path part for operation `uploadRecipeStepImage()` */
  static readonly UploadRecipeStepImagePath = '/recipes/cover/{recipe-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadRecipeStepImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadRecipeStepImage$Response(params: UploadRecipeStepImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadRecipeStepImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadRecipeStepImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadRecipeStepImage(params: UploadRecipeStepImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadRecipeStepImage$Response(params, context).pipe(
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
