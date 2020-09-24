import { Component, OnInit } from '@angular/core';
import { IExercise } from './exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  _listFilter: string;
  _filterOption: string;
  exercises: IExercise[] = [
    {
      id: 1,
      name: 'test',
      description: 'testing description',
      category: 1
    },
    {
      id: 2,
      name: 'second',
      description: 'hello',
      category: 1
    }
  ];
  filteredExercises: IExercise[] = this.exercises;
  constructor() { }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredExercises = this._listFilter ? this.performFilter(this._listFilter.toLowerCase(), this._filterOption.toLowerCase()) : this.exercises;
  }

  get filterOption(): string {
    return this._filterOption;
  }

  set filterOption(value: string) {
    this._filterOption = value;
    this.filteredExercises = this._listFilter ? this.performFilter(this._listFilter.toLowerCase(), this._filterOption.toLowerCase()) : this.exercises;
  }

  performFilter(filterBy: string, option: string): IExercise[] {
    return this.exercises.filter((exercise: IExercise) => exercise[option].toString().toLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
  }

}
