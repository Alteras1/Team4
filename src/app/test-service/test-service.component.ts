import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExerciseImageService } from '../services/exercise-image.service';


@Component({
  selector: 'app-test-service',
  templateUrl: './test-service.component.html',
  styleUrls: ['./test-service.component.css']
})
export class TestServiceComponent implements OnInit{
  filterCategory = 10;
  filterMuscle = 1;
   exercises: any[] = [];
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


