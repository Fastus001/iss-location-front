import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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
  private ISS_NOW_URL = 'http://api.open-notify.org/iss-now.json';

  constructor(private http: HttpClient) { }

  getStationLocation(): Observable<IssNow>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Accept', 'application/json');
    return this.http.get<IssNow>(this.ISS_NOW_URL, {headers: httpHeaders});
  }
}
