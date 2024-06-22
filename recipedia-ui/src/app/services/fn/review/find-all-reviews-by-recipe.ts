/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseReviewResponse } from '../../models/page-response-review-response';

export interface FindAllReviewsByRecipe$Params {
  'recipe-id': number;
  page?: number;
  size?: number;
}

export function findAllReviewsByRecipe(http: HttpClient, rootUrl: string, params: FindAllReviewsByRecipe$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseReviewResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllReviewsByRecipe.PATH, 'get');
  if (params) {
    rb.path('recipe-id', params['recipe-id'], {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseReviewResponse>;
    })
  );
}

findAllReviewsByRecipe.PATH = '/reviews/recipe/{recipe-id}';
