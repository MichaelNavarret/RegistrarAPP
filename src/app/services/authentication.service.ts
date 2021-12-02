import { Injectable } from '@angular/core';
import { BdlocalService } from './bdlocal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private bdLocal:BdlocalService) { }

  isAuthenticate():boolean{
    console.log("Tamaño del array " + this.bdLocal.sesion.length);
    for (let index = 0; index < this.bdLocal.sesion.length; index++) {
      if (this.bdLocal.sesion[index].intEstado){
        console.log("Hay un usuario logeado");
        return true;
      }else{
        return false;
      }
      
    }
  }

  getUser():any{
    for (let index = 0; index < this.bdLocal.sesion.length; index++) {
      if (this.bdLocal.sesion[index].intEstado){
        console.log("Hay un usuario logeado");
        return this.bdLocal.sesion[index].strUsuario;
      }else{
        return null;
      }
    }
  }
}
