import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Passes} from '../dto/passes';

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
  private ISS_NOW_URL: string= 'http://api.open-notify.org/iss-now.json';

  constructor(private http: HttpClient) { }

  getStationLocation(): Observable<IssNow>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Accept', 'application/json');
    return this.http.get<IssNow>(this.ISS_NOW_URL,{headers: httpHeaders});
  }

  getStationPasses(input: Passes):Observable<any>{
    let httpParams =  new HttpParams();
    console.log(input);
    httpParams.append('lat',String(input.latitude))
    httpParams.append('lon',String(input.longitude))
    // if(input.altitude !=null){
    //   httpParams.set('alt',String(input.altitude))
    // }
    // if(input.number != null){
    //   httpParams.set('n',String(input.number))
    // }
    console.log(httpParams)

    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Accept', 'application/json');
    httpHeaders.append('Access-Control-Allow-Origin', 'http://localhost:4200')

    return this.http.get('http://api.open-notify.org/iss-pass.json?lat=25&lon=15',{headers:httpHeaders} );
  }
}
