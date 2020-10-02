import { Component, OnInit } from '@angular/core';
import { ExerciseCategoryService } from '@app/services/exercise-category.service';
import { ExerciseService } from '@app/services/exercise.service';
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
    private category: ExerciseCategoryService,
  ) { }
  ngOnInit(): void {
    this.exercise.getExercises().subscribe({
      next: (data) => {
        this.exercises = data as unknown as IExercise[];
        this.category.getExerciseCategory().subscribe({
          next: (data) => {

          }
        })
        console.log(this.exercise);
      }
    });
  }
}
