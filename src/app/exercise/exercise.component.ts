import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentService } from '@app/services/equipment.service';
import { ExerciseCategoryService } from '@app/services/exercise-category.service';
import { ExerciseService } from '@app/services/exercise.service';
import { MuscleService } from '@app/services/muscle.service';
import { SetsService } from '@app/services/sets.service';
import { AccountService, AlertService } from '@app/_services';
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
  setBuilder: any[] = [];
  setName:String = "New Set";

  constructor(
    private exercise: ExerciseService,
    private category: ExerciseCategoryService,
    private muscle: MuscleService,
    private equipment: EquipmentService,
    private accountService: AccountService,
    private setService: SetsService,
    private alert:AlertService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.exercise.getExercises().subscribe({
      next: (data) => {
        this.exercises = data as unknown as IExercise[];
        this.addCategoryName();
        this.addMuscleName();
        this.addEquipmentName();
      }
    });
  }

  addCategoryName() {
    this.category.getExerciseCategory().subscribe({
      next: (data) => {
        for (let exercise of this.exercises) {
          let foundCategory = data.find((cat) => (cat.id == exercise['category']));
          exercise.categoryName = foundCategory.name;
        }
      }
    })
  }

  addMuscleName() {
    this.muscle.getMuscles().subscribe({
      next: (data) => {
        for (let exercise of this.exercises) {
          let foundMuscles = [];
          for (let muscleInExcercise of exercise.muscles) {
            foundMuscles.push(data.find((muscle) => (muscle.id == muscleInExcercise)));
          }
          exercise.muscles = foundMuscles;
        }
      }
    })
  }

  addEquipmentName() {
    this.equipment.getEquipment().subscribe({
      next: (data) => {
        for (let exercise of this.exercises) {
          let foundEquipment = [];
          for (let equipmentInExercise of exercise.equipment) {
            foundEquipment.push(data.find((equipment) => (equipment.id == equipmentInExercise)));
          }
          exercise.equipment = foundEquipment;
        }
      }
    })
  }

  filterByEquipment(item, filter:number):boolean {
    if (item.equipment.length == 0) { return false }
    let found:boolean = false;
    for (let eq of item.equipment) {
      found = eq.id == filter ? true: found;
    }
    return found;
  }

  filterByMuscle(item, filter:number):boolean {
    console.log(item);
    if (item.muscles.length == 0) { return false }
    let found:boolean = false;
    for (let mu of item.muscles) {
      found = mu.id == filter ? true: found;
    }
    return found;
  }

  onSubmit(f:NgForm, exercise) {
    if (typeof f.value.amount === "number" && Number.isInteger(f.value.amount) && f.value.amount > 0) {
      this.setBuilder.push({id: exercise.id, name: exercise.name, amount: f.value.amount});
    }
  }

  removeFromSet(index: number) {
    this.setBuilder.splice(index, 1);
  }

  createSet() {
    let set = {
      user: this.accountService.userValue.id,
      name: this.setName,
      exercises: []
    }
    for (let exercise of this.setBuilder) {
      set.exercises.push({
        id: exercise.id,
        amount: exercise.amount
      })
    }
    this.setService.createSet(set).subscribe({
      next: (data) => {
        console.log('success');
        this.router.navigate(['/sets']);
        this.alert.success(`${this.setName} has been created!`);
      }
    })
  }
}
