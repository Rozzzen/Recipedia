/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecipeResponse } from '../../models/recipe-response';

export interface FindRecipeById$Params {
  'recipe-id': number;
}

export function findRecipeById(http: HttpClient, rootUrl: string, params: FindRecipeById$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeResponse>> {
  const rb = new RequestBuilder(rootUrl, findRecipeById.PATH, 'get');
  if (params) {
    rb.path('recipe-id', params['recipe-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RecipeResponse>;
    })
  );
}

findRecipeById.PATH = '/recipes/{recipe-id}';
