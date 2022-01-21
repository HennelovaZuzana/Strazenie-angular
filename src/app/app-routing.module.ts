import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsToWatchComponent } from './animals-to-watch/animals-to-watch.component';

const routes: Routes = [
  { path: 'animals', component: AnimalsToWatchComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
