import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Activo } from '../buscar/Models/Activo';
import { TagsManagementService } from '../services/tags-management.service';
import { ActivoRfid } from '../toma-fisica/Models/ActivoRfid';
import { DetalleActComponent } from '../toma-fisica/detalle-act/detalle-act.component';
import { DetalleActRComponent } from './detalle-act-r/detalle-act-r.component';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styleUrls: ['./comparar.component.scss'],
})
export class CompararComponent  implements OnInit {
  activoRfidModal!: ActivoRfid;
  activoModal!: Activo;

  activosSobrantes: ActivoRfid[] = [];
  activosFaltantes: Activo[] = [];

  constructor(public _tagsManagementService: TagsManagementService, private _router: Router, private _modalController: ModalController) { }

  ngOnInit() {
    // this.service.custodio1 = '1707106025';
    this.obtenerListas();
  }

  obtenerListas() {
    // this.service.getActivosSobrantes(this.service.custodio1, this.service.nombreUsuario)
    // .subscribe((data:any) => {
    //   this.activosSobrantes = data;
    //   this.service.activosSobrantesFinal = this.activosSobrantes;
    // });
    // this.service.getActivosFaltante(this.service.custodio1, this.service.nombreUsuario)
    // .subscribe((data:any) => {
    //   this.activosFaltantes = data;
    //   this.service.activosFaltantesFinal = this.activosFaltantes;
    // });
    // this.service.renderActa = true;
  }

  abrirDetalleR(activoR: ActivoRfid) {
    this._modalController.create({
      component: DetalleActRComponent,
      componentProps: {
        activo: activoR
      }
    }).then((modal) => modal.present());
  }

  abrirDetalle(activo: Activo) {
    this._modalController.create({
      component: DetalleActComponent,
      componentProps: {
        act: activo,
        swipeToClose: true
      }
    }).then((modal) => modal.present());
  }
}
