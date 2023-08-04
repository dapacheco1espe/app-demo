import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TomaFisicaComponent } from './toma-fisica.component';

const routes: Routes = [
  {
    path: '',
    component: TomaFisicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TomaFisicaRoutingModule { }
