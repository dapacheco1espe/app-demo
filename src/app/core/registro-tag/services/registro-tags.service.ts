import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivoRfidRQ } from '../Models/ActivoRfidRQ';

@Injectable({
  providedIn: 'root'
})
export class RegistroTagsService {
  private _baseURL:string = '';
  constructor(private _http:HttpClient) {
    this._baseURL = environment.apiURL;
  }

  public registrarActivos(activosList:ActivoRfidRQ[]):Observable<any>{
    return this._http.post(`${this._baseURL}/activosRfid/agregar`,{listaActivosRfid:activosList})
  }
}
