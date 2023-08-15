import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Activo } from '../../buscar/Models/Activo';
import { TagsManagementService } from '../../services/tags-management.service';
import { ActivoRfid } from '../Models/ActivoRfid';
import { ArchivoJustif } from '../Models/ArchivoJustif';
import { TomaFisicaService } from '../services/toma-fisica.service';
@Component({
  selector: 'app-detalle-act',
  templateUrl: './detalle-act.component.html',
  styleUrls: ['./detalle-act.component.scss'],
})
export class DetalleActComponent  implements OnInit {
  @Input() act!: Activo;

  private _actR!: ActivoRfid;
  private _photo!: SafeResourceUrl;
  private _archivoJ!: ArchivoJustif;
  listaEtiquetas: any[] = [];
  mostrarEtiquetas = false;

  constructor(private _tagsManagementService:TagsManagementService, private _tomaFisicaService:TomaFisicaService, private _modalController: ModalController, private _sanitize: DomSanitizer,
              private bluetoothSerial: BluetoothSerial, private _alertController: AlertController,
              private _toastController: ToastController) { }

  ngOnInit() {
    this._tagsManagementService.setCurrentTag = this.act;
   // this.service.activoRespuestaModal = new ActivoRfid();
  }

  cerrarDetalle() {
    this._modalController.dismiss({userData: 1});
  }

  leerTags() {
    /*const a = '12345';
    console.log(a);
    this.listaEtiquetas.push(a);*/
    this.bluetoothSerial.read().then(success => {
      let listaE = [];
        listaE = success.split('\n');
        for (let i = 0; i < listaE.length; i++) {
          this.listaEtiquetas.push(listaE[i]);
          this._tagsManagementService.pushTag = listaE[i];
        }
      this.showToast('Reader: ' + success);
    }, error => {
      this.showError('error Reader 2: ' + error);
    });
  }

  buscarEtiqueta(etiqueta: string) {
    this._tomaFisicaService.getActivoByCodigo({codigoRfid:etiqueta})
    .subscribe((data:any) => {
      if (data === null ) {
        this.listaEtiquetas.push(etiqueta);
        this.mostrarEtiquetas = true;
      } else {
        this.showError('Etiqueta existenten');
      }
    });
  }

  seleccionarEtiqueta(etiqueta:any) {
    this._actR.codigoRfid = etiqueta;
    this._actR.custodio1 = this.act.custodio1;
    this._actR.estadoJustificado = 'NO JUSTIFICADO';
    this._actR.estadoTransaccion = 'PENDIENTE';
   // this._actR.usuario = this.service.nombreUsuario;
    this._actR.descripcion = this.act.codigo + '|' + this.act.descripcion;
    this.showToast('Etiqueta seleccionada');
    this._tagsManagementService.setCurrentTag = this._actR;
    this.listaEtiquetas = [];
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    this._photo = this._sanitize.bypassSecurityTrustResourceUrl( image && (image.dataUrl) || '');
    console.log(this._photo);
    console.log(image.format);
    if (image.base64String !== '') {
      this._archivoJ.custodio1 = this.act.custodio1;
      this._archivoJ.custodio2 = this.act.custodio2;
      this._archivoJ.descripcion = 'Se tomo la foto desde el celular';
      this._archivoJ.documento = image.base64String || '';
      this._archivoJ.nombreArchivo = 'fotoCelular';
      this._archivoJ.tipoArchivo = image.format;
      this._archivoJ.codigoBien = this.act.codigo.toString();
      // this.service.insertarArchivo(this._archivoJ)
      // .subscribe((data:any) => {
      //   console.log(data.codigo);
      // });
    }
  }

  async showError(messageE: string) {
    const alert = await this._alertController.create({
      header: '¡Error!',
      subHeader: 'Ocurrió un error',
      message: messageE,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showToast(messageE: string) {
    const toast = this._toastController.create({
      message: messageE,
      duration: 1000
    });
    (await toast).present();
  }

}
