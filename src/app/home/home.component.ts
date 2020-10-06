import { Component, OnInit } from '@angular/core';
import { IExercise } from '@app/Interfaces/IExercise';
import { ISets } from '@app/Interfaces/ISets';
import { CalendarService } from '@app/services/calendar.service';
import { ExerciseService } from '@app/services/exercise.service';
import { SetsService } from '@app/services/sets.service';
import { IUser } from '@app/_models';
import { AccountService } from '@app/_services';
@Component(
  {
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
  }
)
export class HomeComponent {
  user: IUser;
  calendar;
  currentDay = (new Date()).getDay();
  private week: any[] = [
    {
      "day": "Sunday",
      "abbr": "Su",
      "num": 0,
      sets: []
    },
    {
      "day": "Monday",
      "abbr": "M",
      "num": 1,
      sets: []
    }, {
      "day": "Tuesday",
      "abbr": "Tu",
      "num": 2,
      sets: []
    }, {
      "day": "Wednesday",
      "abbr": "W",
      "num": 3,
      sets: []
    }, {
      "day": "Thursday",
      "abbr": "Th",
      "num": 4,
      sets: []
    }, {
      "day": "Friday",
      "abbr": "F",
      "num": 5,
      sets: []
    },
    {
      "day": "Saturday",
      "abbr": "Sa",
      "num": 6,
      sets: []
    },
  ];
  today;
  sets: any[];
  constructor(
    private accountService: AccountService,
    private calendarService: CalendarService,
    private setsService: SetsService,
    private exerciseService: ExerciseService
  ) {
    this.user = this.accountService.userValue;
    this.getCalendar();
  }

  ngOnInit(): void {

  }

  createCalendar() {
    this.calendarService.newCalendar(this.user.id).subscribe({
      next: (data) => {
        this.getCalendar();
      }
    });
  }

  getCalendar() {
    this.calendarService.getCalendarByUser(this.user.id).subscribe({
      next: (data) => {

        console.log(data);
        if (data.length === 0) {
          console.log('test');
          this.createCalendar();
        }
        this.calendar = data[0];
        for (let set of this.calendar.sets) {
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
        this.today = this.week[this.currentDay];
        this.getSets();
      }
    });
  }

  getSets() {
    this.setsService.getSetsByUserId(this.user.id).subscribe({
      next: (data) => {
        this.sets = data as unknown as ISets[];
        this.exerciseService.getExercises().subscribe({
          next: (exerciseData) => {
            let allExercises = exerciseData as unknown as IExercise[];
            for (let set of this.sets) {
              for (let exercises of set.exercises) {
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
    let foundSets = [];
    for (let set of this.today.sets) {
      foundSets.push(... this.sets.filter((s) => (s.id == set)));
    }
    this.today.sets.length = 0;
    this.today.sets.push.apply(this.today.sets,foundSets);
    //this.ref.detectChanges();
    //this.ref.reattach();
  }
}
