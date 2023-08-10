import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompararComponent } from './comparar.component';

const routes: Routes = [
  {
    path:'',
    component: CompararComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompararRoutingModule { }
