import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
'@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiHolidaysService {
  // Se establece la base url del API a consumir
  apiURL = 'https://apis.digital.gob.cl/fl/feriados';
  // Se declara la variable http de tipo HttpClient
  constructor(private http:HttpClient) { }

  getHolidays():Observable <any> {
    const fecha : Date = new Date();
    console.log(fecha);
    const mes = (fecha.getMonth()+1);
    console.log("Mes: " + mes)
    return this.http.get(this.apiURL+'/2020/'+ mes).pipe(
      retry(3)
    );
  }

  getHoliday(meId:string):Observable <any>{
    return this.http.get(this.apiURL+'/2020/'+ meId).pipe(
      retry(3)
    );
  }
}
