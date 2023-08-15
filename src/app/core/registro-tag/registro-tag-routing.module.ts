import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroTagComponent } from './registro-tag.component';

const routes: Routes = [
  {
    path:'',
    component:RegistroTagComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroTagRoutingModule { }
