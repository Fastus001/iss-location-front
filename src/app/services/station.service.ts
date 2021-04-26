import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export interface IssPosition {
  latitude: number;
  longitude: number;
}

export interface IssNow{
  message: string;
  timestamp: number;
  iss_position: IssPosition;
}
@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  getStationLocation(): Observable<IssNow>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Accept', 'application/json');
    return this.http.get<IssNow>(environment.ISS_NOW_URL, {headers: httpHeaders});
  }
}
