import { Component, OnInit } from '@angular/core';
import { ICalendar } from '../Interfaces/ICalendar';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  _currentDate = new Date();
  date = this._currentDate.getDate();
  month = this._currentDate.getMonth();
  day = this._currentDate.getDay();
  year = this._currentDate.getFullYear();
  week = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  };
  _userCalendar;
  _user = 1;
  constructor(private calendarService: CalendarService) {
    this.calendarService.getCalendarByUser(this._user).subscribe({
      next: (data) => {
        this._userCalendar = data as ICalendar[];
        this.generateWeek();
      }
    })
  }

  ngOnInit(): void {

  }

  generateWeek() {
    for(let calendar of this._userCalendar) {
      for (let set of calendar.sets) {
        if (set.days.includes("mon")) {
          this.week.monday.push(set.id);
        }
        if (set.days.includes("tue")) {
          this.week.tuesday.push(set.id);
        }
        if (set.days.includes("wed")) {
          this.week.wednesday.push(set.id);
        }
        if (set.days.includes("thr")) {
          this.week.thursday.push(set.id);
        }
        if (set.days.includes("fri")) {
          this.week.friday.push(set.id);
        }
        if (set.days.includes("sat")) {
          this.week.saturday.push(set.id);
        }
        if (set.days.includes("sun")) {
          this.week.sunday.push(set.id);
        }
      }
    }
  }
}
