import {Responses} from './Responses';
import {RequestDTO} from './requestDTO';

export interface PassesResponse {
  message: string;
  request: RequestDTO;
  response: Responses [];
}
