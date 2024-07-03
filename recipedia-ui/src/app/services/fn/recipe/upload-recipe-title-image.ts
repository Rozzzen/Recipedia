/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';


export interface UploadRecipeTitleImage$Params {
  'recipe-id': number;
      body?: {
'file': Blob;
}
}

export function uploadRecipeTitleImage(http: HttpClient, rootUrl: string, params: UploadRecipeTitleImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, uploadRecipeTitleImage.PATH, 'post');
  if (params) {
    rb.path('recipe-id', params['recipe-id'], {});
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

uploadRecipeTitleImage.PATH = '/recipes/image/{recipe-id}';
