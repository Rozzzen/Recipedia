/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadRecipeStepImage$Params {
  'recipe-id': number;
  stepNumber: number;
      body?: {
'file': Blob;
}
}

export function uploadRecipeStepImage(http: HttpClient, rootUrl: string, params: UploadRecipeStepImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, uploadRecipeStepImage.PATH, 'post');
  if (params) {
    rb.path('recipe-id', params['recipe-id'], {});
    rb.query('stepNumber', params.stepNumber, {});
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

uploadRecipeStepImage.PATH = '/recipes/cover/{recipe-id}';
