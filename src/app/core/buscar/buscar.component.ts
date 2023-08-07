import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ToastController } from '@ionic/angular';
import { TagsManagementService } from '../services/tags-management.service';
import { Activo } from './Models/Activo';
import { Funcionario } from './Models/Funcionario';
import { BuscarService } from './services/buscar.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent  implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  private _entrada1: string = '';
  public activos: Activo[] = [];
  public listaFuncionarios: Funcionario[] = [];

  public custodio1Ingresado:string = '';
  public nombreCustodioIngresado:string = '';
  public mostrarCustodios:boolean = false;

  constructor( private _alertController: AlertController, private _toastController: ToastController,
    private _buscarActivosService:BuscarService, private _tagsManagementService:TagsManagementService) {}

  public ngOnInit() {
  }

  escogerFuncionario(funcionario: Funcionario) {
    this._tagsManagementService.setFuncionario = funcionario;
    this.custodio1Ingresado =this._tagsManagementService.currentFuncionario.identificacion;
  }

  buscarBienes() {
    // this.service.custodio1 = this.custodio1Ingresado;
    if (this.custodio1Ingresado !== '' ) {
      this.mostrarCustodios = false;
      this._buscarActivosService.getActivosByCustodio({custodio1:this.custodio1Ingresado})
      .subscribe( data => {
        if (data.length > 0) {
          this.activos = data;
        } else {
          this.showError('El custodio ' + this.custodio1Ingresado +  ' no tiene bienes');
        }
      });
    } else {
      this.mostrarCustodios = true;
      this._buscarActivosService.getFuncionarios({nombre: this.nombreCustodioIngresado})
      .subscribe( data => {
        if (data.length > 0 ) {
          this.listaFuncionarios = data;
        } else {
          this.showError('El nombre ingresado ' + this.nombreCustodioIngresado + ' no existe');
        }
      });
    }
  }

  etiquetarActivos() {
    if (this.activos.length > 0 ) {
      for(let i = 0;i < this.activos.length; i++){
        this._tagsManagementService.pushTag= this.activos[i];
      }
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
