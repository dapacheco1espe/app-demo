import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Models/Usuario';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _baseUrl:string = "";
  constructor(private _http: HttpClient) {
    this._baseUrl = environment.apiURL;
  }

  public validateUser(user:Usuario):Observable<any>{
    return this._http.post(`${this._baseUrl}/auth/sign-in`,user);
  }
}
