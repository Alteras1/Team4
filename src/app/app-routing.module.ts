import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './calendar/month/month.component';
import { Error404Component } from './error404/error404.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { HomeComponent } from './home/home.component';
import { TestServiceComponent } from './test-service/test-service.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'exercise', component: ExerciseComponent},
  { path: 'calendar', component: MonthComponent },
  {path: 'test', component: TestServiceComponent },
  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
