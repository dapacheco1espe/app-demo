import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  {
    path:'menu',
    component:MenuComponent,
    children:[
      {
        path:'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module') .then(m => m.DashboardModule),
      },
      {
        path: 'buscar',
        loadChildren: () => import('../buscar/buscar.module') .then(m => m.BuscarModule),
      },
      {
        path: 'tomaFisica',
        loadChildren: () => import('../toma-fisica/toma-fisica.module') .then(m => m.TomaFisicaModule),
      },
      {
        path: 'comparar',
        loadChildren: () => import('../comparar/comparar.module') .then(m => m.CompararModule),
      },
      {
        path:'registroTag',
        loadChildren:() => import('../registro-tag/registro-tag.module') .then(m => m.RegistroTagModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
