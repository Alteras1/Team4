import { Component, OnInit } from '@angular/core';
import { SetsService } from '../services/sets.service';
import { ISets } from '../Interfaces/ISets';
import { ExerciseService } from '../services/exercise.service';
import { IExercise } from '../Interfaces/IExercise';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  userId: number = 1;
  sets: any[] = [];
  allExercises: any[] = [];
  setExcercises: any[] = [];

  constructor(
    private set: SetsService,
    private exercise: ExerciseService,
  ) { }

  ngOnInit(): void {
    this.set.getSets().subscribe({
      next: (data) => {
        this.sets = data as unknown as ISets[];
        this.exercise.getExercises().subscribe({
          next: (exerciseData) => {
            this.allExercises = exerciseData as unknown as IExercise[];
            
            //Implement user login here; going to grab the 1st user for now
            console.log(this.allExercises);
            for (let set of this.sets[0].exercises) {
              console.log(set.id);
              let value = this.allExercises.find(x => x.id == set.id);
              console.log(value);
              this.setExcercises.push(value);
            }
            console.log(this.setExcercises);
          }
        });
      }
    });
  }

}
