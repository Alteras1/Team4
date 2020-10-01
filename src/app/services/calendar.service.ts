import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICalendar } from '../Interfaces/ICalendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendarURL = '/api/calendar';
  constructor(private http: HttpClient) { }
  getCalendar(): Observable<ICalendar[]> {
    return this.http.get<ICalendar[]>(this.calendarURL);
  }
}
