/* tslint:disable */
/* eslint-disable */
import {UserResponse} from '../models/user-response';

export interface ReviewResponse {
  comment?: string;
  createdBy?: UserResponse;
  rate?: number;
}
