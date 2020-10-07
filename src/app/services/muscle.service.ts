import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMuscle } from '@app/Interfaces/IMuscle';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  productURL = environment.apiUrl + '/muscle';
  constructor(private http: HttpClient) { }
  getMuscles(): Observable<IMuscle[]> {
    return this.http.get<IMuscle[]>(this.productURL);
  }
}

