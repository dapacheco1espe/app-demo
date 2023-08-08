import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleActComponent } from './detalle-act.component';

const routes: Routes = [
  {
    path:'',
    component: DetalleActComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleActRoutingModule { }
