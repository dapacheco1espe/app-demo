import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TagsManagementService } from '../services/tags-management.service';
import { ActivoRfid } from './Models/ActivoRfid';
import { DetalleActComponent } from './detalle-act/detalle-act.component';
import { TomaFisicaService } from './services/toma-fisica.service';

@Component({
  selector: 'app-toma-fisica',
  templateUrl: './toma-fisica.component.html',
  styleUrls: ['./toma-fisica.component.scss'],
})
export class TomaFisicaComponent  implements OnInit {

  activosRfid: ActivoRfid[] = [];

  listaTags: any[] = [];

  constructor(private _tomaFisicaService:TomaFisicaService, public tagsManagementService: TagsManagementService, private router: Router, private modal: ModalController,
              private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    // this.service.custodio1 = '1707106025';
  }

  obtenerListas() {
    this._tomaFisicaService.getAllActivosRfid()
    .subscribe((data:any) => {
      this.activosRfid = data;
    });
    this.obtenerTags();
  }

  read2() {
    this.bluetoothSerial.read().then(success => {
      console.log("Leer tag method: "+success);
      let listaE = [];
        listaE = success.split('\n');
        for (let i = 0; i < listaE.length; i++) {
          this.buscarEtiqueta(listaE[i]);
          this.listaTags.push(listaE[i]);
          this.tagsManagementService.pushTag = listaE[i];
        }
      this.showToast('Reader: ' + success);
    }, error => {
      this.showError('error Reader 2: ' + error);
    });
  }

  buscarEtiqueta(etiqueta: string) {
    console.log("Buscar la siguiente etiqueta: "+etiqueta);
    this._tomaFisicaService.getActivoByCodigo({codigoRfid:etiqueta})
    .subscribe((data:any) => {
      if (data !== null ) {
        this.activosRfid.push(data);
        // if (data.custodio1 !== this.service.funcionarioGlobal.identificacion) {
        //   this.showError('Este bien pertence a otro custodio (' + this.service.funcionarioGlobal.nombre + ')');
        // }
      } else {
        this.showError('Etiqueta no existente');
        this.listaTags.push(etiqueta);
      }
    });
  }

  async obtenerTags() {
    //this.listaTags = (await Rfid1Plugin.getTags('Filtro')).results;
    console.log('Tags: ' + this.listaTags);
  }

  abrirDetalleR(activoR: ActivoRfid) {
    console.log("Activo que se abre en detalle component: "+activoR);
    this.modal.create({
      component: DetalleActComponent,
      componentProps: {
        act: activoR
      }
    }).then((modal) => modal.present());
  }

  async showError(messageE: string) {
    const alert = await this.alertCtrl.create({
      header: '¡Error!',
      subHeader: 'Ocurrió un error',
      message: messageE,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showToast(messageE: string) {
    const toast = this.toastCtrl.create({
      message: messageE,
      duration: 1000
    });
    (await toast).present();
  }
}
