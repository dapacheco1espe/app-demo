import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent  implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  entrada1: string = '';
  //activos: Activo[] = [];
  activos: any[] = [];
  //listaFuncionarios: Funcionario[] = [];
  listaFuncionarios: any[] = [];
  custodio1Ingresado = '';
  nombreCustodioIngresado = '';
  mostrarCustodios = false;

  constructor( private _alertController: AlertController, private _toastController: ToastController) {
    /* if (service.custodio1 === '') {
    } else {
      this.service.getActivos(service.custodio1)
      .subscribe(data => {
        this.activos = data;
        this.service.activosFinal = this.activos;
      });
    }*/
  }

  ngOnInit() {
  }

  //escogerFuncionario(funcionario: Funcionario) {
  escogerFuncionario(funcionario: any) {
    //this.service.funcionarioGlobal = funcionario;
    //this.custodio1Ingresado = this.service.funcionarioGlobal.identificacion;
    this.custodio1Ingresado = 'xyz';
  }

  buscarBienes() {
    //this.service.custodio1 = this.custodio1Ingresado;
    if (this.custodio1Ingresado !== '' ) {
      this.mostrarCustodios = false;
      // this.service.getActivos(this.custodio1Ingresado)
      // .subscribe( data => {
      //   if (data.length > 0) {
      //     this.activos = data;
      //   } else {
      //     this.showError('El custodio ' + this.custodio1Ingresado +  ' no tiene bienes');
      //   }
      // });
    } else {
      this.mostrarCustodios = true;
      // this.service.getFuncionarios(this.nombreCustodioIngresado.toUpperCase())
      // .subscribe( data => {
      //   if (data.length > 0 ) {
      //     this.listaFuncionarios = data;
      //   } else {
      //     this.showError('El nombre ingresado ' + this.nombreCustodioIngresado + ' no existe');
      //   }
      // });
    }
  }

  etiquetarActivos() {
    if (this.activos.length > 0 ) {
      //this.service.listaActivosEtiquetar = this.activos;
      this.showToast('Se copio correctamente');
    } else {
      this.showError('No hay bienes para etiquetar');
    }
  }

  limpiarBusqueda() {
    this.mostrarCustodios = false;
    this.listaFuncionarios = [];
    this.nombreCustodioIngresado = '';
    this.custodio1Ingresado = '';
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
