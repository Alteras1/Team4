import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { HomeComponent } from './home/home.component';
import { SetsComponent } from './sets/sets.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'exercise', component: ExerciseComponent},
  {path: 'sets', component: SetsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
