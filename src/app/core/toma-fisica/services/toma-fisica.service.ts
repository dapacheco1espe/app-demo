import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivoRfidRS } from '../Models/ActivoRfidRS';

@Injectable({
  providedIn: 'root'
})
export class TomaFisicaService {
  private _baseURL:string = '';
  constructor(private _http:HttpClient) {
    this._baseURL = environment.apiURL;
  }

  public getAllActivosRfid():Observable<any>{
    return this._http.get(`${this._baseURL}/activosRfid/all`);
  }

  public getActivoByCodigo(activo: ActivoRfidRS):Observable<any>{
    return this._http.post(`${this._baseURL}/activosRfid/rfid`,activo);
  }
}
