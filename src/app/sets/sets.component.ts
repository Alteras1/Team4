import { Component, OnInit } from '@angular/core';
import { SetsService } from '../services/sets.service';
import { ISets } from '../Interfaces/ISets';
import { ExerciseService } from '../services/exercise.service';
import { IExercise } from '../Interfaces/IExercise';
import { AccountService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit {
  sets: any[] = [];
  userSet: ISets[] = [];
  allExercises: any[] = [];
  setExercises: any[] = [];

  constructor(
    private set: SetsService,
    private exercise: ExerciseService,
    private account: AccountService,
    private router: Router
  ) {
    this.set.clearCurrentSet();
  }

  ngOnInit(): void {
    this.set.getSets().subscribe({
      next: (data) => {
        this.sets = data as unknown as ISets[];
        this.exercise.getExercises().subscribe({
          next: (exerciseData) => {
            this.allExercises = exerciseData as unknown as IExercise[];
            this.userSet = this.sets.filter(x => x.user == this.account.userValue.id);
            console.log(this.userSet);
            for (let set of this.userSet) {
              let exerciseArray = [];
              for (let exerc of set.exercises) {
                let value = this.allExercises.find(x => x.id == exerc.id);
                exerciseArray.push({
                  "name": value.name,
                  "amount": exerc.amount,
                  "id": value.id
                });
              }
              this.setExercises.push({
                "id": set.id,
                "name": set.name,
                "exercises": exerciseArray
              });
            }
          }
        });
      }
    });
  }

  deleteSet(selectedSet: ISets) {
    console.log(selectedSet);
    this.set.deleteSet(selectedSet.id).subscribe({
      next: (data) => {
        const index = this.setExercises.indexOf(selectedSet, 0);
        if (index > -1) {
          this.setExercises.splice(index, 1);
        }
      }
    });
  }

  editSet(selectedSet: ISets) {
    console.log(selectedSet);
    this.set.changingSet = selectedSet;
    console.log(this.set.editingSet);
    this.router.navigate(['/exercise']);
  }

}
