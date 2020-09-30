import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWgerde } from '../Interfaces/IWgerde';
@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  productURL = 'https://wger.de/api/v2/muscle?language=2&license_author=wger.de&limit=66';
  constructor(private http: HttpClient) { }
  getMuscles(): Observable<IWgerde> {
    return this.http.get<IWgerde>(this.productURL);
  }
}

