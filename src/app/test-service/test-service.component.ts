import { Component, OnInit } from '@angular/core';
import { IExercise } from '../Interfaces/IExercise';
import { ExerciseCategoryService } from '../services/exercise-category.service';
import { ExerciseInfoService } from '../services/exercise-info.service';
import { MuscleService } from '../services/muscle.service';

@Component({
  selector: 'app-test-service',
  templateUrl: './test-service.component.html',
  styleUrls: ['./test-service.component.css']
})
export class TestServiceComponent implements OnInit {
  muscles: IMuscle[];
  categories: IExerciseCategory[];
  exercisesinfo: IExerciseInfo[];
  equipaments: IEquipment[];

  constructor(
    private muscleService: MuscleService,
    private exerciseInfoService: ExerciseInfoService,
    private exerciseCategory: ExerciseCategoryService,
    private exerciseinfo: ExerciseInfoService,
  ) { }
  ngOnInit(): void {
    this.muscleService.getMuscles().subscribe({
      next: (data) => {
        this.muscles = data.results as any as IMuscle[];
        console.log(this.muscles);
      }

    });

  }
}


