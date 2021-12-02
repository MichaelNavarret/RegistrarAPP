import { Injectable } from '@angular/core';
import { Isesiones } from '../interfaces/isesiones';

import { Storage } from '@ionic/storage-angular';
import { Asistencia } from '../interfaces/asistencia';
@Injectable({
  providedIn: 'root'
})
export class bdasistenciaService {
  asistencia: Asistencia[]=[];
  user:any;
  pass:any;
  name:any;
  fecha:string;
  private _storage: Storage | null = null;
  

  constructor(private storage: Storage) {
    this.init();
    this.cargarSesion();

  }
  async cargarSesion() {
    const miAsistencia = await this.storage.get('asistencia');
    if (miAsistencia){
      this.asistencia = miAsistencia;
    }
  }


  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  //--------------------------------------------------Mis Metodos------------------------------------------------------

  registrarAsistencia(user:string, idAsig:string,seccion:string,asig:string,doc:string,correo:string){
    const date : Date = new Date();
    this.fecha = (date.getDay() + "/" + ((date.getMonth()+1) + "/" + date.getFullYear()));
    console.log("Ingresando al registro de Asistencia");
    //crear una instrucción LAMBDA para asegurarme que el contactos NO exista.
      this.asistencia.unshift({strUsuario:user, strFecha:this.fecha,strIdAsignatura:idAsig,strSeccion:seccion,strAsignatura:asig,strDocente:doc,strCorreo:correo})
      this._storage.set('asistencia', this.asistencia)
  }
}