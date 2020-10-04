import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISets } from '../Interfaces/ISets';



@Injectable({
  providedIn: 'root',
})
export class SetsService {
  productURL = '/api/sets';
  constructor(private http: HttpClient) {}
  getSets(): Observable<ISets> {
    return this.http.get<ISets>(this.productURL);
  }
  getSetsByUserId(id:number): Observable<ISets[]> {
    return this.http.get<ISets[]>(this.productURL + `?user=${id}`);
  }
}
