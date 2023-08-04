import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from './Models/Usuario';
import { UsuarioResponse } from './Models/UsuarioResponse';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuarioIngresado = '';
  private _tmpUser: Usuario;
  constructor(
    public _service: LoginService,
    private _router: Router,
    private _alertCtrl: AlertController
  ) {
    this._tmpUser = {
      login: '',
      passwd: null,
      tryAccess: null,
      dateTry: null,
    };
  }

  ngOnInit() {}

  login() {
    if (this.usuarioIngresado !== '') {
      this.usuarioIngresado = this.usuarioIngresado.toUpperCase();
      this._tmpUser.login = this.usuarioIngresado;
      this.validarUsuario(this._tmpUser);
    } else {
      this.showError('Usuario vacio');
    }
  }

  validarUsuario(user: Usuario) {
    this._service.validateUser(user).subscribe({
      next: (response: UsuarioResponse) => {
        sessionStorage.setItem("user",JSON.stringify(response));
        this._router.navigateByUrl('/menu/dashboard');
      },
      error:(err:HttpErrorResponse)=>{
        this.showError('Usuario incorrecto');
      }
    });
  }

  async showError(messageE: string) {
    const alert = await this._alertCtrl.create({
      header: '¡Error!',
      subHeader: 'Ocurrió un error',
      message: messageE,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
