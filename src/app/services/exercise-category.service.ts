import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExerciseCategory } from '../Interfaces/IExerciseCategory';

@Injectable({
  providedIn: 'root'
})
export class ExerciseCategoryService {
  productURL = '/api/category';
  constructor(private http: HttpClient) { }
  getExerciseCategory(): Observable<IExerciseCategory[]> {
    return this.http.get<IExerciseCategory[]>(this.productURL);
  }
}
