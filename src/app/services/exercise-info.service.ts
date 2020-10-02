import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWgerde } from '../Interfaces/IWgerde';


@Injectable({
  providedIn: 'root'
})
export class ExerciseInfoService {
  productURL = 'https://wger.de/api/v2/exerciseinfo?language=2&license_author=wger.de&limit=66';
  constructor(private http: HttpClient) { }
  getExerciseInfo(): Observable<IWgerde> {
    return this.http.get<IWgerde>(this.productURL);
  }
}
