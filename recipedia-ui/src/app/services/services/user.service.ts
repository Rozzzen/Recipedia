/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {loadUser, LoadUser$Params} from '../fn/user/load-user';
import {saveUser, SaveUser$Params} from '../fn/user/save-user';
import {uploadProfilePicture, UploadProfilePicture$Params} from '../fn/user/upload-profile-picture';
import {UserResponse} from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `loadUser()` */
  static readonly LoadUserPath = '/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadUser$Response(params?: LoadUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return loadUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadUser(params?: LoadUser$Params, context?: HttpContext): Observable<UserResponse> {
    return this.loadUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `saveUser()` */
  static readonly SaveUserPath = '/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveUser$Response(params: SaveUser$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveUser(params: SaveUser$Params, context?: HttpContext): Observable<number> {
    return this.saveUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadProfilePicture()` */
  static readonly UploadProfilePicturePath = '/user/image';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProfilePicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture$Response(params?: UploadProfilePicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProfilePicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProfilePicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture(params?: UploadProfilePicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProfilePicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
