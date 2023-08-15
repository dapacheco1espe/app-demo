import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Activo } from '../buscar/Models/Activo';
import { TagsManagementService } from '../services/tags-management.service';
import { DetalleActComponent } from '../toma-fisica/detalle-act/detalle-act.component';
import { ActivoRfidRQ } from './Models/ActivoRfidRQ';
import { RegistroTagsService } from './services/registro-tags.service';

@Component({
  selector: 'app-registro-tag',
  templateUrl: './registro-tag.component.html',
  styleUrls: ['./registro-tag.component.scss'],
})
export class RegistroTagComponent  implements OnInit {

  activos: Activo[] = [];
  activosR: ActivoRfidRQ[] = [];

  constructor(private service: TagsManagementService, private _registrarTagsService:RegistroTagsService,
     private _alertController: AlertController, private _modalController: ModalController,
              private _toastController: ToastController) { }

  ngOnInit() {
    this.activos = this.service.tagsList;
    this.activos.push({
      "codigo": 282,
        "codigoEmpresa": 3,
        "localidad": 1,
        "origen": 0,
        "tipo": 3,
        "subtipo": 1804,
        "clase": 1,
        "codLocalidad": 0,
        "conceptoTransaccion": 0,
        "lote": 0,
        "sublote": 0,
        "descripcion": "INCLUYE ARCHIVADOR DE 3 GAVETAS  1 SERV. PARA TECLADO",
        "observacion": "21323",
        "cantidad": 1,
        "valor": 0,
        "fechaAdquisicion": "2008-12-31T05:00:00.000+00:00",
        "custodio1": "1700200767",
        "custodio2": '',
        "usuario": "GRENIA",
        "mef": '',
        "codMef": '',
    });
  }

  async abrirDetalle(activo: Activo) {
    const m = await this._modalController.create({
      component: DetalleActComponent,
      componentProps: {
        act: activo,
        swipeToClose: true
      }
    });
    m.present();
    m.onDidDismiss().then( (res:any) => {
      console.log(this.service.currentTag);
      this.activosR.push(this.service.currentTag);
      this.quitarElemento(this.activos, activo);
    });
  }

  quitarElemento(array: any[], item:any) {
    const i = array.indexOf(item);
    if (i !== -1) {
      array.splice(i, 1);
    }
  }

  guardarEtiquetas() {
    this._registrarTagsService.registrarActivos(this.activosR).subscribe({
      next:()=>{
        this.showToast('Se guardo correctamente');
      }
    });
    
  }

  limpiarEtiquetas() {
    this.activosR = [];
    this.activos = [];
  }

  loadData(event:any) {
    setTimeout(() => {
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.activos.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
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
