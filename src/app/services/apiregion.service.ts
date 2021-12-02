import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
'@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiregionService {
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
    }
    // Se establece la base url del API a consumir
    apiURL = 'https://apis.digital.gob.cl/dpa/regiones';
    // Se declara la variable http de tipo HttpClient
    constructor(private http:HttpClient) { }
  
    getRegiones():Observable <any> {
      return this.http.get(this.apiURL).pipe(
        retry(3)
      );
    }
  
    getRegion(regId):Observable <any> {
      return this.http.get(this.apiURL+'/'+regId).pipe(
        retry(3)
      );
    }
}