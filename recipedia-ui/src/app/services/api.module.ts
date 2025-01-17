/* tslint:disable */
/* eslint-disable */
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfiguration, ApiConfigurationParams} from './api-configuration';

import {UserService} from './services/user.service';
import {ReviewService} from './services/review.service';
import {RecipeService} from './services/recipe.service';
import {AuthenticationService} from './services/authentication.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserService,
    ReviewService,
    RecipeService,
    AuthenticationService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
