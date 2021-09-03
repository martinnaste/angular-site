import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiechartComponent } from './components/piechart/piechart.component';
import { SphereComponent } from './components/sphere/sphere.component';

const routes: Routes = [
  {path: 'piechart', component: PiechartComponent},
  {path: 'sphere', component: SphereComponent},
  { path: '',   redirectTo: '/piechart', pathMatch: 'full' },
  { path: '**', redirectTo: '/piechart'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
