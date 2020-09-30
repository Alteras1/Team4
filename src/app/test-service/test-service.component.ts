import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { ExerciseImageService } from '../services/exercise-image.service';


@Component({
  selector: 'app-test-service',
  templateUrl: './test-service.component.html',
  styleUrls: ['./test-service.component.css']
})
export class TestServiceComponent implements OnInit{
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


