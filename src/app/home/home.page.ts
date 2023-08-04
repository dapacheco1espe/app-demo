import { Component } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public devices!: any;
  public receivedData: any;
  constructor(
    private _bluetoothSerial: BluetoothSerial,
    private _alertController: AlertController
  ) {}

  public activateBluetooth() {
    this._bluetoothSerial.isEnabled().then(
      (response) => {
        console.log('conectado');
        this.listDevices();
      },
      (error) => {
        console.error('no se ha conectado el dispositivo');
      }
    );
  }

  public write(){
    this._bluetoothSerial
          .write('hello world')
          .then((success) => {
            console.log('correcta escritura');
          })
          .catch((err) => console.error('error en escritura: ' + err));
  }

  public read(){
    this._bluetoothSerial.read()
          .then(success=>{
            console.log("data: "+success);
          })
          .catch(err=>{
            console.error("error lectura: "+err);
          })
  }
  public connect(address: any) {
    this._bluetoothSerial.connect(address).subscribe({
      next: (success) => {
        //write data
        console.log('yes, connected');

      },
      error: () => {
        console.error('error al conectar');
      },
    });
  }

  public disconnect() {
    this._bluetoothSerial.disconnect();
    console.log('desconectado');
  }

  public listDevices() {
    this._bluetoothSerial.list().then(
      (response) => {
        this.devices = response;
      },
      (error) => {
        console.error('error al listar dispositivos');
      }
    );
  }

  // public async isEnabled(msg:string){
  //   const alert = await this._alertController.create({
  //     header:'Alerta',
  //     message:msg,
  //     buttons:[
  //       {
  //         text:'Ok',
  //         handler:()=>{
  //           console.log("ok");
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
}
