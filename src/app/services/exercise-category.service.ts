import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IExerciseCategory } from '../Interfaces/IExerciseCategory';

@Injectable({
  providedIn: 'root'
})
export class ExerciseCategoryService {
  productURL = environment.apiUrl + '/category';
  constructor(private http: HttpClient) { }
  getExerciseCategory(): Observable<IExerciseCategory[]> {
    return this.http.get<IExerciseCategory[]>(this.productURL);
  }
}
