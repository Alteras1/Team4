import { Injectable } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { IExerciseComplete } from '../Interfaces/IExerciseComplete';
import { IExerciseImage } from '../Interfaces/IExerciseImage';
import { ExerciseImageService } from '../services/exercise-image.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseCompleteService {
  exercises: IExerciseComplete[];
  exerciseImages: IExerciseImage[];
  constructor(private exerciseService: ExerciseService, private exerciseImageservice: ExerciseImageService) {
    this.exerciseService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data.results as IExerciseComplete[];
        this.exerciseImageservice.getExerciseImage().subscribe({
          next: (imageData) => {
            this.exerciseImages = imageData.results as IExerciseImage[];
            for (let exercise in this.exercises) {
              let result = this.exerciseImages.filter((image) => { return image.id === this.exercises[exercise].id });
              if (result.length !== 0) {
                this.exercises[exercise] = Object.assign(this.exercises[exercise], {
                  image: result[0].image,
                })
                //this.exercises[exercise].image = result[0].image;
              }
            }
            console.log(this.exercises)
          }
        })

      }
    });
  }

  getExerciseComplete() {
    console.log(this.exercises);
    return this.exercises;
  }
}
