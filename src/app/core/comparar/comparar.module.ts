import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { CompararRoutingModule } from './comparar-routing.module';
import { CompararComponent } from './comparar.component';


@NgModule({
  declarations: [CompararComponent],
  imports: [
    CommonModule,
    CompararRoutingModule,
    IonicModule,
  ]
})
export class CompararModule { }
