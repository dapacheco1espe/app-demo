import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsManagementService {

  private _tagsList:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  public get tagsList():Array<any>{
    return this._tagsList.getValue();
  }

  public set pushTag(tag:any){
    const tmpTagList:Array<any> = this._tagsList.getValue();
    tmpTagList.push(tag);
    this._tagsList.next(tmpTagList);
  }
}
