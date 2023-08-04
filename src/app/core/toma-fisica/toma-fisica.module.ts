import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { IonicModule } from '@ionic/angular';
import { TomaFisicaRoutingModule } from './toma-fisica-routing.module';
import { TomaFisicaComponent } from './toma-fisica.component';

@NgModule({
  declarations: [TomaFisicaComponent],
  imports: [
    CommonModule,
    TomaFisicaRoutingModule,
    FormsModule,
    IonicModule,
  ],
  providers:[BluetoothSerial]
})
export class TomaFisicaModule { }
