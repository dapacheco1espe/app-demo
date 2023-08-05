import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustodioReq } from '../Models/CustodioReq';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  private _baseURL:string = '';
  constructor(private _http:HttpClient) {
    this._baseURL = environment.apiURL;
  }

  public getActivosByCustodio(requestObject:CustodioReq):Observable<any>{
    return this._http.post(`${this._baseURL}/activos/custodio`,requestObject);
  }
}
