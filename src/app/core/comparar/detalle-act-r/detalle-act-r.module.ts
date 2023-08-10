import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { IonicModule } from '@ionic/angular';
import { DetalleActRRoutingModule } from './detalle-act-r-routing.module';
import { DetalleActRComponent } from './detalle-act-r.component';


@NgModule({
  declarations: [DetalleActRComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleActRRoutingModule
  ],
  providers:[BluetoothSerial],
})
export class DetalleActRModule { }
