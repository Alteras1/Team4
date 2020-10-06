import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ISets } from '../Interfaces/ISets';



@Injectable({
  providedIn: 'root',
})
export class SetsService {
  productURL = environment.apiUrl + '/sets';
  constructor(private http: HttpClient) {}
  getSets(): Observable<ISets> {
    return this.http.get<ISets>(this.productURL);
  }
  getSetsByUserId(id:number): Observable<ISets[]> {
    return this.http.get<ISets[]>(this.productURL + `?user=${id}`);
  }
  deleteSet(id:number): Observable<ISets> {
    console.log("deleting set" + id);
    return this.http.delete<ISets>(this.productURL + `/${id}`);
  }
}
