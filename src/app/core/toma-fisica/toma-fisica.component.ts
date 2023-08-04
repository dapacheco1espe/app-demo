import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toma-fisica',
  templateUrl: './toma-fisica.component.html',
  styleUrls: ['./toma-fisica.component.scss'],
})
export class TomaFisicaComponent  implements OnInit {
  //activoRfidModal: ActivoRfid = new ActivoRfid();
  //activoModal: Activo = new Activo();

  //activosRfid: ActivoRfid[] = [];
  activosRfid: any[] = [];

  listaTags: any[] = [];

  constructor(private router: Router, private modal: ModalController,
              private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    // this.service.custodio1 = '1707106025';
  }

  obtenerListas() {
    // this.service.getActivosRfid()
    // .subscribe(data => {
    //   this.activosRfid = data;
    // });
    // this.obtenerTags();
  }

  read2() {
    this.bluetoothSerial.read().then(success => {
      let listaE = [];
      listaE = success.split('\n');
      for ( let i = 0; i < listaE.length; i++ ) {
        let subListaE = [];
        const val =  listaE[i].search(':');
        if ( val !== -1 ) {
          subListaE = listaE[i].split(':');
          let a = '';
          a = subListaE[0];
          if ( a === 'EP') {
            let asd = '';
            asd = subListaE[1].trim();
            if (this.listaTags.indexOf(asd) === -1 ){
              this.buscarEtiqueta(asd);
              this.listaTags.push(asd);
             // this.service.listaTagsGlobal.push(asd);
            }
            // this.listaTags.push(asd);
          }
        }
      }
      this.showToast('Reader: ' + success);
    }, error => {
      this.showError('error Reader 2: ' + error);
    });
  }

  buscarEtiqueta(etiqueta: string) {
    // this.service.getActivosRfidByCodigoR(etiqueta)
    // .subscribe(data => {
    //   if (data !== null ) {
    //     console.log('IF');
    //     this.activosRfid.push(data);
    //     if (data.custodio1 !== this.service.funcionarioGlobal.identificacion) {
    //       this.showError('Este bien pertence a otro custodio (' + this.service.funcionarioGlobal.nombre + ')');
    //     }
    //   } else {
    //     this.showError('Etiqueta no existente');
    //     this.listaTags.push(etiqueta);
    //   }
    // });
  }

  async obtenerTags() {
    // this.listaTags = (await Rfid1Plugin.getTags('Filtro')).results;
    // console.log('Tags: ' + this.listaTags);
  }

  abrirDetalleR(activoR:any) {
    // this.modal.create({
    //   component: DetalleActRPage,
    //   componentProps: {
    //     activo: activoR
    //   }
    // }).then((modal) => modal.present());
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
