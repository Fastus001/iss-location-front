import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams,} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {PassesResponse} from '../dto/request';
import {Passes} from "../dto/passes";

@Injectable({
  providedIn: 'root'
})
export class PassesService {

  private PASSES_URL = 'http://api.open-notify.org/iss-pass.json';

  constructor(private http: HttpClient) { }

  getPasses(passes: Passes): Observable<PassesResponse>{
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin','*')
      .set('Access-Control-Allow-Methods','GET')
      .set('Access-Control-Allow-Credentials','true');
    let httpParams = new HttpParams()
      .set('lat', String(passes.latitude))
      .set('lon', String(passes.longitude));
    console.log(httpHeaders);


    return this.http.get<PassesResponse>(this.PASSES_URL, {headers: httpHeaders, observe: "body",
      responseType: "json", params: httpParams});
  }
}
