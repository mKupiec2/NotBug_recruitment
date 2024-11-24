import { Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';

export const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'details/:id', component: CarDetailComponent}
];
