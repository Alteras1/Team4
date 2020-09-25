import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWgerde } from 'src/app/exercise/exercise';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  productURL = 'https://wger.de/api/v2/exercise?language=2&license_author=wger.de&limit=66';
  constructor(private http: HttpClient) {}
  getExercises(): Observable<IWgerde> {
    return this.http.get<IWgerde>(this.productURL);
  }
}