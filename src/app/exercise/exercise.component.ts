import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '@app/services/equipment.service';
import { ExerciseCategoryService } from '@app/services/exercise-category.service';
import { ExerciseService } from '@app/services/exercise.service';
import { MuscleService } from '@app/services/muscle.service';
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
  constructor(
    private exercise: ExerciseService,
    private category: ExerciseCategoryService,
    private muscle: MuscleService,
    private equipment: EquipmentService,
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
}
