import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExercise } from 'src/app/exercise/exercise';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  productURL = 'https://wger.de/api/v2/exercise?language=2&license_author=wger.de&limit=66';
  constructor(private http: HttpClient) {}
  getExercises(): Observable<IExercise[]> {
    return this.http.get<IExercise[]>(this.productURL);
  }
}
