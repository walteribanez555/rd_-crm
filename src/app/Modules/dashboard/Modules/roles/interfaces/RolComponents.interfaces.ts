import { RolForm } from "./RolForm.interface";



export class Rol{

  private _rols : RolForm[] = [];


  constructor( rols : RolForm[]){
    this._rols = rols;

  }


  public get rols() :  RolForm[] {
    return this._rols;
  }




}
