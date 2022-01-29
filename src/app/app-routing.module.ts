import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsToWatchComponent } from './animals-to-watch/animals-to-watch.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { WatchOffersComponent } from './watch-offers/watch-offers.component';

const routes: Routes = [
  { path: 'animals', component: AnimalsToWatchComponent },
  { path: '', component: LoginComponent},
  { path: 'menu/:userName', component: MenuComponent},
  { path: 'watch', component: WatchOffersComponent },
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
