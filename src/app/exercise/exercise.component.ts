import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { IExercise } from '../Interfaces/IExercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  filterCategory = '0';
  filterMuscle = '0';
  filterExerciseId = '0';
  filterExerciseName = '0';
  filterEquipment = '0';
   exercises: any[] = [];
  constructor(
    private exercise: ExerciseService,
  ) { }
  ngOnInit(): void {
    this.exercise.getExercises().subscribe({
      next: (data) => {
        this.exercises = data.results as any[] ;
      }

    });

  }
}
