import { Component, OnInit } from '@angular/core';
import { ExerciseImageService } from '../services/exercise-image.service';


@Component({
  selector: 'app-test-service',
  templateUrl: './test-service.component.html',
  styleUrls: ['./test-service.component.css']
})
export class TestServiceComponent implements OnInit {
  exercises: any[];
  musclefilter = 7;
  constructor(
    private exerciseImage: ExerciseImageService,
  ) { }
  ngOnInit(): void {
    this.exerciseImage.getExerciseImage().subscribe({
      next: (data) => {
        this.exercises = data.results as any[] ;
        console.log(this.exerciseImage);
      }

    });

  }
}


