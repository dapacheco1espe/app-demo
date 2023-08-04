import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from './Models/Page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  public pages:Array<Page>;
  public selectedPath:string = '';
  constructor(private _router:Router) { 
    this.pages = [
      {
        title: 'Dashboard',
        url: '/menu/dashboard'
      },
      {
        title: 'Busqueda',
        url: '/menu/buscar'
      },
      {
        title: 'Toma Física',
        url: '/menu/tomaFisica'
      },
      {
        title: 'Comparar',
        url: '/menu/comparar'
      },
      {
        title: 'Registrar Tags',
        url: '/menu/registroTag'
      }
    ];
    this._router.events.subscribe((event:any) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}

}
