import { Component, OnInit } from '@angular/core';
import { IExercise } from './exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

}
