/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseRecipeResponse } from '../../models/page-response-recipe-response';

export interface FindAllRecipes$Params {
  page?: number;
  size?: number;
  tags?: Array<'KOREAN' | 'QUICK' | 'VEGAN' | 'BAKERY' | 'PASTA'>;
}

export function findAllRecipes(http: HttpClient, rootUrl: string, params?: FindAllRecipes$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRecipeResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllRecipes.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('tags', params.tags, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseRecipeResponse>;
    })
  );
}

findAllRecipes.PATH = '/recipes';