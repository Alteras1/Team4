import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IExercise } from '../Interfaces/IExercise';
import { IWgerde } from '../Interfaces/IWgerde';



@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  productURL = environment.apiUrl + '/exercise';
  constructor(private http: HttpClient) {}
  getExercises(): Observable<IExercise> {
    return this.http.get<IExercise>(this.productURL);
  }
}
