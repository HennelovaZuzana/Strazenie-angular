import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsToWatchComponent } from './animals-to-watch/animals-to-watch.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'animals', component: AnimalsToWatchComponent },
  { path: '', component: MenuComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
