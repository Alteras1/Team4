import { Component, Inject, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { ICalendar, IWeek } from '../Interfaces/ICalendar';
import { CalendarService } from '../services/calendar.service';
import { DOCUMENT } from '@angular/common'
import { SetsService } from '../services/sets.service';
import { ISets } from '@app/Interfaces/ISets';
import { ExerciseService } from '@app/services/exercise.service';
import { IExercise } from '@app/Interfaces/IExercise';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  _currentDate = new Date();
  currentdate = this._currentDate.getDate();
  currentmonth = this._currentDate.getMonth();
  currentday = this._currentDate.getDay();
  currentyear = this._currentDate.getFullYear();
  week: any[] = [
    {
      "day": "Sunday",
      "num": 0,
      sets: []
    },
    {
      "day": "Monday",
      "num": 1,
      sets: []
    },    {
      "day": "Tuesday",
      "num": 2,
      sets: []
    },    {
      "day": "Wednesday",
      "num": 3,
      sets: []
    },    {
      "day": "Thursday",
      "num": 4,
      sets: []
    },    {
      "day": "Friday",
      "num": 5,
      sets: []
    },
    {
      "day": "Saturday",
      "num": 6,
      sets: []
    },
  ];
  sets: any[];

  _userCalendar;
  _user = 1;

  constructor(
    private calendarService: CalendarService,
    private setsService: SetsService,
    private exerciseService: ExerciseService,
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
        this.ref.detectChanges();
        this.getSets();
      }
    });
  }

  getSets() { //adds names to set exercises
    this.setsService.getSetsByUserId(this._user).subscribe({
      next: (data) => {
        this.sets = data as unknown as ISets[];
        this.exerciseService.getExercises().subscribe({
          next: (exerciseData) => {
            let allExercises = exerciseData as unknown as IExercise[];
            for(let set of this.sets) {
              for(let exercises of set.exercises) {
                let value = allExercises.find((exer) => (exer.id == exercises.id));
                exercises.name = value.name;
              }
            }
            this.assignSets();
          }
        });
      }
    });
  }

  assignSets() {
    for(let day of this.week) {
      let foundSets = [];
      for(let set of day.sets) {
        foundSets.push(this.sets.filter((s) => (s.id == set)));
      }
      day.sets.length = 0;
      day.sets.push.apply(day.sets, ...foundSets);
    }
    this.ref.detectChanges();
    this.ref.reattach();
  }


}
