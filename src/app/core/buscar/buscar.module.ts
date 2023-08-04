import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuscarRoutingModule } from './buscar-routing.module';
import { BuscarComponent } from './buscar.component';


@NgModule({
  declarations: [BuscarComponent],
  imports: [
    CommonModule,
    BuscarRoutingModule,
    IonicModule,
    FormsModule,
  ]
})
export class BuscarModule { }
