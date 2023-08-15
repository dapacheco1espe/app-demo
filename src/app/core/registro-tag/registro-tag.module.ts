import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { IonicModule } from '@ionic/angular';
import { RegistroTagRoutingModule } from './registro-tag-routing.module';
import { RegistroTagComponent } from './registro-tag.component';


@NgModule({
  declarations: [RegistroTagComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroTagRoutingModule
  ],
  providers:[BluetoothSerial]
})
export class RegistroTagModule { }
