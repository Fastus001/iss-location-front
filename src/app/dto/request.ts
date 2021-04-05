export interface Request {
  altitude: number;
  datetime: number;
  latitude: number;
  longitude: number;
  passes: number;
}

export interface Response {
  duration: number;
  risetime: number;
}

export interface PassesResponse {
  message: string;
  request: Request;
  responses: Response[];
}
