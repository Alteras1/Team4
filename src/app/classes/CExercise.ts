import { ExerciseService } from '../exercise.service';
import { IExercise } from '../Interfaces/IExercise';
import { ExerciseImageService } from '../services/exercise-image.service';

export class Cexercise implements IExercise{
  id: number;
 name: string;
  description: string;
  category: number;
  muscles: number[];
  // tslint:disable-next-line: variable-name
  muscles_secondary: number[];
  equipment: number[];
  image: string;
 }

export class Cexercises {
  static exercises: Cexercise[];
  static images: any[];
  constructor(private exerciseService: ExerciseService, private exerciseImageservice: ExerciseImageService) {
    this.exerciseService.getExercises().subscribe({
      next: (data) => {
        Cexercises.exercises = data.results as any[];
      }
    });

    this.exerciseImageservice.getExerciseImage().subscribe({
      next: (data1) => {
        Cexercises.images = data1.results as any[];
      }
    });

    // tslint:disable-next-line: forin
    for (let x in Cexercises.exercises) {
      for (let y in Cexercises.images) {
        // tslint:disable-next-line: triple-equals
        if (Cexercises.exercises[x].id == Cexercises.images[y].exercise) {
          Cexercises.exercises[x].image = Cexercises.images[y].image;
        }
      }
    }
  }
}
