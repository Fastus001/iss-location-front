import {Response} from './response';
import {RequestDTO} from './requestDTO';

export interface PassesResponse {
  message: string;
  request: RequestDTO;
  response: Response [];
}
