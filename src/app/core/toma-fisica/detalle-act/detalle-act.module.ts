import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleActRoutingModule } from './detalle-act-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { DetalleActComponent } from './detalle-act.component';


@NgModule({
  declarations: [DetalleActComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleActRoutingModule
  ],
  providers:[BluetoothSerial],
})
export class DetalleActModule { }
