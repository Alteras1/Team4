import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWgerde } from '../Interfaces/IWgerde';



@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  productURL = '/api/exercise';
  constructor(private http: HttpClient) {}
  getExercises(): Observable<IWgerde> {
    return this.http.get<IWgerde>(this.productURL);
  }
}
