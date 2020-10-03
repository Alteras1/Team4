import { Component, Inject, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { ICalendar, IWeek } from '../Interfaces/ICalendar';
import { CalendarService } from '../services/calendar.service';
import { DOCUMENT } from '@angular/common'
import { SetsService } from '../services/sets.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  _currentDate = new Date();
  date = this._currentDate.getDate();
  month = this._currentDate.getMonth();
  day = this._currentDate.getDay();
  year = this._currentDate.getFullYear();
  week: any[] = [
    {
      "day": "Sunday",
      sets: []
    },
    {
      "day": "Monday",
      sets: []
    },    {
      "day": "Tuesday",
      sets: []
    },    {
      "day": "Wednesday",
      sets: []
    },    {
      "day": "Thursday",
      sets: []
    },    {
      "day": "Friday",
      sets: []
    },
    {
      "day": "Saturday",
      sets: []
    },
  ];


  _userCalendar;
  _user = 1;

  constructor(
    private calendarService: CalendarService,
    private setsService: SetsService,
    @Inject(DOCUMENT) document,
    private ref: ChangeDetectorRef
  ) {
    ref.detach();
  }

  ngOnInit(): void {
    this.getCalendar();


  }

  getCalendar() {
    this.calendarService.getCalendarByUser(this._user).subscribe({
      next: (data) => {
        this._userCalendar = data as ICalendar[];
        for(let calendar of this._userCalendar) {
          for (let set of calendar.sets) {
            if (set.days.includes("sun")) {
              this.week[0].sets.push(set.id);
            }
            if (set.days.includes("mon")) {
              this.week[1].sets.push(set.id);
            }
            if (set.days.includes("tue")) {
              this.week[2].sets.push(set.id);
            }
            if (set.days.includes("wed")) {
              this.week[3].sets.push(set.id);
            }
            if (set.days.includes("thr")) {
              this.week[4].sets.push(set.id);
            }
            if (set.days.includes("fri")) {
              this.week[5].sets.push(set.id);
            }
            if (set.days.includes("sat")) {
              this.week[6].sets.push(set.id);
            }
          }
        }
        console.log(this.week);
        this.ref.detectChanges();
      }
    });
  }


  // generateWeek() {
  //   let element = document.getElementById('week') as HTMLElement;
  //   let builder: string = "";
  //   for (let day in this.week) {
  //     builder += `<td>${this.week[day]}</td>`
  //   }
  //   console.log(builder);
  //   element.innerHTML = builder;
  // }

}
