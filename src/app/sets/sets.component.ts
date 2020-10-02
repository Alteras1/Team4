import { Component, OnInit } from '@angular/core';
import { SetsService } from '../services/sets.service';
import { ISets, ISetExercises } from '../Interfaces/ISets';
import { ExerciseService } from '../services/exercise.service';
import { IExercise } from '../Interfaces/IExercise';
import { AccountService } from '../_services';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  sets: any[] = [];
  userSet: ISets[] = [];
  allExercises: any[] = [];
  setExcercises: any[] = [];
  setAmount: number[] = [];

  constructor(
    private set: SetsService,
    private exercise: ExerciseService,
    private account: AccountService,
  ) { }

  ngOnInit(): void {
    this.set.getSets().subscribe({
      next: (data) => {
        this.sets = data as unknown as ISets[];
        this.exercise.getExercises().subscribe({
          next: (exerciseData) => {
            this.allExercises = exerciseData as unknown as IExercise[];
            
            //Implement user login here; going to grab the 1st user for now
            // console.log(this.account.userValue.id);
            // console.log(this.account.userValue.username);
            this.userSet = this.sets.filter(x => x.user == this.account.userValue.id);
            console.log(this.userSet);
            // for (let set of this.userSet) {
            //   for (let exerc of set.exercises) {
            //     console.log(exerc.id);
            //     let value = this.allExercises.find(x => x.id == exerc.id);
            //     console.log(value);
            //     this.setExcercises.push(value);
            //     this.setAmount.push(exerc.amount);
            //   }
            // }
            
            console.log(this.setExcercises);
            console.log(this.setAmount);
          }
        });
      }
    });
  }

}
