/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {findAllReviewsByRecipe, FindAllReviewsByRecipe$Params} from '../fn/review/find-all-reviews-by-recipe';
import {ReviewResponse} from '../models/review-response';
import {saveReview, SaveReview$Params} from '../fn/review/save-review';

@Injectable({ providedIn: 'root' })
export class ReviewService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveReview()` */
  static readonly SaveReviewPath = '/reviews';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveReview()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveReview$Response(params: SaveReview$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveReview(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveReview$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveReview(params: SaveReview$Params, context?: HttpContext): Observable<number> {
    return this.saveReview$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAllReviewsByRecipe()` */
  static readonly FindAllReviewsByRecipePath = '/reviews/{recipe-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllReviewsByRecipe()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReviewsByRecipe$Response(params: FindAllReviewsByRecipe$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ReviewResponse>>> {
    return findAllReviewsByRecipe(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllReviewsByRecipe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReviewsByRecipe(params: FindAllReviewsByRecipe$Params, context?: HttpContext): Observable<Array<ReviewResponse>> {
    return this.findAllReviewsByRecipe$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ReviewResponse>>): Array<ReviewResponse> => r.body)
    );
  }

}
