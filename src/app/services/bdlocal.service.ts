import { Injectable } from '@angular/core';
import { Isesiones } from '../interfaces/isesiones';

import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class BdlocalService {
  sesion: Isesiones[]=[];
  user:any;
  pass:any;
  name:any;
  tipo:any;
  private _storage: Storage | null = null;
  

  constructor(private storage: Storage) {
    this.init();
    this.cargarSesion();

  }
  async cargarSesion() {
    const miSesion = await this.storage.get('sesion');
    if (miSesion){
      this.sesion = miSesion;
    }
  }


  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  //--------------------------------------------------Mis Metodos------------------------------------------------------

  registrarUsurio(user:string, pass:string,name:string,tipo:string){
    console.log("Ingresando al registro");
    //crear una instrucción LAMBDA para asegurarme que el contactos NO exista.
      const existe = this.sesion.find(c=>c.strUsuario===user);
      if(!existe){
        this.sesion.unshift({strUsuario:user, strPassword:pass,strNombre:name,intEstado:false, strTipo:tipo})
        this._storage.set('sesion', this.sesion)
      }
  }
  

  async cerrarSesion(usuario){
    const index = this.sesion.findIndex(c=>c.strNombre===usuario);
    this.user = this.sesion[index].strUsuario;
    this.pass = this.sesion[index].strPassword;
    this.name = this.sesion[index].strNombre;
    this.tipo = this.sesion[index].strTipo;
    console.log(this.user + "/ " + this.pass + "/" +this.name + "/" + this.tipo);
    this.sesion.splice(index,1);
    this.sesion.unshift({strUsuario:this.user, strPassword:this.pass , 
                          strNombre: this.name, intEstado:false,strTipo:this.tipo });
    this._storage.set('sesion', this.sesion)
  }

  iniciarSesion(usuario){
    const index = this.sesion.findIndex(c=>c.strUsuario===usuario);
    this.user = this.sesion[index].strUsuario;
    this.pass = this.sesion[index].strPassword;
    this.name = this.sesion[index].strNombre;
    this.tipo = this.sesion[index].strTipo;
    this.sesion.splice(index,1);
    console.log(this.user + "/ " + this.pass + "/" +this.name + "/" + this.tipo);
    this.sesion.unshift({strUsuario:this.user, strPassword:this.pass , 
                          strNombre: this.name, intEstado:true,strTipo:this.tipo });
    this._storage.set('sesion', this.sesion)
  }

  setPass(usuario:string,pass:string){
    const index = this.sesion.findIndex(c=>c.strUsuario===usuario);
    this.user = this.sesion[index].strUsuario;
    this.pass = pass;
    this.name = this.sesion[index].strNombre;
    this.tipo = this.sesion[index].strTipo;
    this.sesion.splice(index,1);
    console.log(this.user + "/ " + this.pass + "/" +this.name + "/" + this.tipo);
    this.sesion.unshift({strUsuario:this.user, strPassword:this.pass , 
                          strNombre: this.name, intEstado:false, strTipo: this.tipo });
    this._storage.set('sesion', this.sesion)
  }
}

