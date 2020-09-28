import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  _currentDate = new Date();
  constructor() { }

  ngOnInit(): void {
  }

  generateCalendar() {
    const date = this._currentDate.getDate();
    const month = this._currentDate.getMonth();
    const day = this._currentDate.getDay();
    const year = this._currentDate.getFullYear();

    let calendar = new Array();

    let calendarDate = new Date(year, month);       //Starts date at the first of the month
    let calendarWeek = new Array();
    console.log(calendarDate);

    if (calendarDate.getDay() !== 0) {              //add empty days to the beginning
      for (let day = 0; day < calendarDate.getDay(); day++) {
        calendarWeek.push({
          date : "",
        });
      }
    }

    while (calendarDate.getMonth() === month) {
      calendarWeek.push({
        date: calendarDate.getDate(),
      })

      if (calendarDate.getDay() === 6) {    //If at the end of the week (Sat)
        calendar.push(calendarWeek);   //Add to the calendar builder
        calendarWeek = [];                  //Empty the week builder
      }

      calendarDate.setDate(calendarDate.getDate() + 1);   //If value outside of date value for month, auto updates Month (MDN)
    }

    if (calendarDate.getDay() !== 0) {      //If leftover days
      for (let day = calendarDate.getDay(); day % 7 !== 0 ; day++) {    //Add empty days
        calendarWeek.push({
          date: "",
        })
      }
      calendar.push(calendarWeek);
    }

    console.log(calendar);

    return calendar;
  }
}
