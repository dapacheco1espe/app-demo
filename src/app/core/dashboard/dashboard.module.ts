import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { IonicModule } from '@ionic/angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DashboardRoutingModule
  ],
  providers:[
    BluetoothSerial
  ]
})
export class DashboardModule { }
