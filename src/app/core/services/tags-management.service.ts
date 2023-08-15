import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Funcionario } from '../buscar/Models/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class TagsManagementService {

  private _tagsList:BehaviorSubject<any> = new BehaviorSubject([]);
  private _currentTag:BehaviorSubject<any> = new BehaviorSubject(null);
  private _currentFuncionario:BehaviorSubject<Funcionario> = new BehaviorSubject({
    codigo          : 0,
    codigoEmpresa   : 0,
    nombre          : '',
    identificacion  : '',
  });

  constructor() { }

  public get tagsList():Array<any>{
    return this._tagsList.getValue();
  }

  public set pushTag(tag:any){
    const tmpTagList:Array<any> = this._tagsList.getValue();
    tmpTagList.push(tag);
    this._tagsList.next(tmpTagList);
  }

  public get currentFuncionario():Funcionario{
    return this._currentFuncionario.getValue();
  }

  public set setFuncionario(funcionario:Funcionario){
    this._currentFuncionario.next(funcionario);
  }

  public get currentTag():any{
    return this._currentTag.getValue();
  }

  public set setCurrentTag(tag:any){
    this._currentTag.next(tag);
  }
}
