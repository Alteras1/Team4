import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { IExercise, IWgerde } from './exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  _listFilter: string;
  // tslint:disable-next-line: variable-name
  _filterOption: string;
  exercises: IExercise[] = [];
  filteredExercises: IExercise[] = this.exercises;
  constructor(private exerciseService: ExerciseService) {
    this.filteredExercises = this.exercises;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    // tslint:disable-next-line: max-line-length
    this.filteredExercises = this._listFilter ? this.performFilter(this._listFilter.toLowerCase(), this._filterOption.toLowerCase()) : this.exercises;
  }

  get filterOption(): string {
    return this._filterOption;
  }

  set filterOption(value: string) {
    this._filterOption = value;
    // tslint:disable-next-line: max-line-length
    this.filteredExercises = this._listFilter ? this.performFilter(this._listFilter.toLowerCase(), this._filterOption.toLowerCase()) : this.exercises;
  }

  performFilter(filterBy: string, option: string): IExercise[] {
    return this.exercises.filter((exercise: IExercise) => exercise[option].toString().toLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data.results;
        this.filteredExercises = data.results;
        console.log(this.exercises);
      }

    });

  }
}