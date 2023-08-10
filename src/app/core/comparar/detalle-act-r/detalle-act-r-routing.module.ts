import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleActRComponent } from './detalle-act-r.component';

const routes: Routes = [
  {
    path: '',
    component: DetalleActRComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleActRRoutingModule { }
