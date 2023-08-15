import { Component, NgZone, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { TagsManagementService } from '../services/tags-management.service';
import { ActivosService } from './services/activos.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  listaTags: any[] = [];
  // pairedList: PairedList;
  pairedList: Array<any> = [];
  listToggle = false;
  pairedDeviceId = 0;
  dataSend = '';
  constructor(
    public _service: ActivosService,
    private _tagsManagementService:TagsManagementService,
    private ngZone: NgZone,
    private bluetoothSerial: BluetoothSerial,
    public _navController: NavController,
    private _alertController: AlertController,
    private _toastController: ToastController
  ) {}

  ngOnInit() {
    this.listaTags = [];
  }

  public scanRfidTag() {
    this.bluetoothSerial.read().then(
      (success) => {
        let listaE = [];
        listaE = success.split('\n');
        for (let i = 0; i < listaE.length; i++) {
          this.listaTags.push(listaE[i]);
          this._tagsManagementService.pushTag = listaE[i];
        }
        this._showToast('Reader: ' + success);
      },
      (error) => {
        this._showError('error Reader 2: ' + error);
      }
    );
  }
  public scanAvailableBluetoothDevices() {
    this.bluetoothSerial.isEnabled().then(
      (success) => {
        this._listPairedDevices();
      },
      (error) => {
        this._showError('Por favor, activa el Bluetooth');
      }
    );
  }

  public deviceDisconnect(device: any) {
    this.bluetoothSerial.disconnect();
    device.connected = false;
    this._showToast('Se ha desconectado del dispositivo');
  }
  public connect(device: any) {
    this.ngZone.run(() => {
      this.bluetoothSerial.connect(device.address).subscribe({
        next: (success) => {
          this._showToast('Conectado correctamente');
          device.connected = true;
          //this.service.conectadoDispositivo = true;
        },
        error: (error) => {
          this._showError('No se ha podido conectar, algo ha fallado.');
        },
      });
    });
  }

  private _listPairedDevices() {
    this.bluetoothSerial.list().then(
      (success) => {
        this.pairedList = success;
        this.listToggle = true;
        //this.service.pairedListGlobal = success;
      },
      (error) => {
        this._showError(
          'Ha sucedido un error al recuperar la lista, inténtalo de nuevo'
        );
        this.listToggle = false;
      }
    );
  }

  private async _showError(messageE: string) {
    const alert = await this._alertController.create({
      header: '¡Error!',
      subHeader: 'Ocurrió un error',
      message: messageE,
      buttons: ['OK'],
    });

    await alert.present();
  }

  private async _showToast(messageE: string) {
    const toast = this._toastController.create({
      message: messageE,
      duration: 1000,
    });
    (await toast).present();
  }
}
