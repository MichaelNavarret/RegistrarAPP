import { Component, OnInit } from '@angular/core';
import { ApiHolidaysService } from 'src/app/services/api-holidays.service';
import { ApiregionService } from 'src/app/services/apiregion.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { BdlocalService } from 'src/app/services/bdlocal.service';
import { AlertController } from '@ionic/angular';
import { bdasistenciaService } from 'src/app/services/bdasistencia.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  data: any;
  email:any;
  subject:any;
  body:any;
  public contador:number=0;
  public ocultar1: boolean = false;
  asistencia:any[] = [
    {strUsuario:""},
    {strFecha:""},
    {strIdAsignatura:""},
    {strSeccion:""},
    {strAsignatura:""},
    {strDocente:""},
    {strCorreo:""},
  ];
  asistencias:any[] = [
    {strUsuario:""},
    {strFecha:""},
    {strIdAsignatura:""},
    {strSeccion:""},
    {strAsignatura:""},
    {strDocente:""},
    {strCorreo:""},
  ];
  nombreUsuario:any;
    ///////////////////////////////////////////////// Variables /////////////////////////////////////////////////////////////////
  //Variables para Api Feriados
  mes:any;
  feriadoId:any;
  feriados:any[]=[
    {nombre:""},
    {fecha:""}
  ];
  error:any[]=[
    {nombre:"No hay feriados este mes :("}
  ]
  meses:any[] = [
    {key:1, val:'Enero'},  
    {key:2, val:'Febrero'},   
    {key:3, val:'Marzo'},  
    {key:4, val:'Abril'},   
    {key:5, val:'Mayo'},    
    {key:6, val:'Junio'},    
    {key:7, val:'Julio'},    
    {key:8, val:'Agosto'},
    {key:9, val:'Septiembre'},
    {key:10, val:'Octubre'},
    {key:11, val:'Noviembre'},
    {key:12, val:'Diciembre'},
  ]

  //Variables para API Regiones
  regiones: any;
  regDuoc:any [] = [];
  sedeDuoc:any[] = [];
  regCod:any;
  sedes:any[]=[
    {key:"05",sede:"Sede Valparaíso", estado:"Abierta"},
    {key:"05",sede:"Sede Viña del Mar", estado:"Abierta"},
    {key:"08",sede:"Campus Arauco", estado:"Abierta"},
    {key:"08",sede:"Sede Concepción", estado:"Abierta"},
    {key:"09",sede:"Campus Villa Rica", estado:"Abierta"},
    {key:"10",sede:"Sede Puerto Montt", estado:"Abierta"},
    {key:"13",sede:"Sede Alameda", estado:"Abierta"},
    {key:"13",sede:"Sede Antonio Varas", estado:"Abierta"},
    {key:"13",sede:"Sede Educación Continua", estado:"Abierta"},
    {key:"13",sede:"Sede Maipú", estado:"Abierta"},
    {key:"13",sede:"Sede Melipilla", estado:"Abierta"},
    {key:"13",sede:"Sede Padre Alonso de Ovalle", estado:"Abierta"},
    {key:"13",sede:"Sede Plaza Norte", estado:"Abierta"},
    {key:"13",sede:"Sede Plaza Oeste", estado:"Abierta"},
    {key:"13",sede:"Sede Plaza Vespucio", estado:"Abierta"},
    {key:"13",sede:"Sede Puente Alto", estado:"Abierta"},
    {key:"13",sede:"Sede San Bernardo", estado:"Abierta"},
    {key:"13",sede:"Sede San Carlos de Apoquindo", estado:"Abierta"},
    {key:"13",sede:"Sede San Joaquín", estado:"Abierta"},
  ]

  ///////////////////////////////////////////////// Metodos /////////////////////////////////////////////////////////////////
  constructor(private atehntication:AuthenticationService, private api:ApiHolidaysService, private apiReg:ApiregionService,
              private activeroute: ActivatedRoute, private router: Router, private bdLocal:BdlocalService, public alertController:AlertController,
              private asistBD:bdasistenciaService) { 
    this.activeroute.queryParams.subscribe(params => {
      console.log("Entrnado a revisar parametros")
      if (this.router.getCurrentNavigation().extras.state){
        console.log("Parametro encontrado")
        this.data = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.data);
      }else{
        console.log("Parametro no encontrado")
      }
    })
    
    this.getHolidays();
    this.getRegiones();
    this.getAsistencia();
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getAsistencia();
  }
  getHolidays(){
    
    this.api.getHolidays().subscribe((data)=>{
      this.feriados=data;
      console.log(this.feriados);
    });
  }
  getItem() {
    console.log(this.mes)
    this.api.getHoliday(this.mes).subscribe((data)=>{
      this.feriados=data;
      console.log(this.feriados);
      console.log("Largo de cadena: " + this.feriados.length)
      if(this.feriados.length == null){
        console.log("No hay feriado")
        this.feriados = this.error;
      }
    });
  }

  getRegiones(){
    this.apiReg.getRegiones().subscribe((data)=>{
      this.regiones = data;
      console.log(this.regiones);
      for (let index = 0; index < this.regiones.length; index++) { //Metodo utilizado para filtrar las regiones que poseen sedes de Duoc
        if (this.regiones[index].codigo == "13" || this.regiones[index].codigo == "05" ||
            this.regiones[index].codigo == "08" || this.regiones[index].codigo == "09" || this.regiones[index].codigo == "10"){
              this.regDuoc.push(this.regiones[index]);
            }
        
      }
      this.regiones = this.regDuoc;
    });
  }

  getSede(){
    this.sedeDuoc = [];
    console.log(this.regCod)
    for (let index = 0; index < this.sedes.length; index++) {
      if (this.sedes[index].key == this.regCod){
        this.sedeDuoc.push(this.sedes[index]);
      }
      
    }
  }

  getAsistencia(){
    if (this.asistBD.asistencia.length > 0){
      this.asistencias = [];
      for (let index = 0; index < this.asistBD.asistencia.length; index++) {
        if (this.asistBD.asistencia[index].strUsuario == this.data){
          this.asistencias.push(this.asistBD.asistencia[index]);       
          this.email = this.asistBD.asistencia[0].strCorreo;
          this.subject = ("Asistencia de " + this.data + " del " + this.asistBD.asistencia[0].strFecha);
          this.body = ("En el siguiente correo se adjunta la asistencia de " + this.data + " con fecha de " + this.asistBD.asistencia[0].strFecha + " de la asignatura " + this.asistBD.asistencia[0].strAsignatura);
        }
      }
      console.log(this.asistencia.toString);
      console.log("Tamaño del arreglo final " + this.asistencias.length);
    }
  }

  exit(){
    this.router.navigate(['/home']);
    this.bdLocal.cerrarSesion(this.data);
  }

  scanqr(){
    
    let navigationExtras: NavigationExtras = {
      state: {user:this.data}
    };
    this.router.navigate(['/qrscan'],navigationExtras);
  }

  accion1(){
      for (let index = 0; index < this.asistBD.asistencia.length; index++) {
        if (this.asistBD.asistencia[index].strUsuario == this.data){
          this.contador=this.contador+1;
          
        }
      }
      if (this.contador==0){
        this.presentAlert("No cuenta con asistencias registradas");
      }else{
        this.ocultar1 = !this.ocultar1;
      }
    
  }
  obtenerEmail(){
    window.location.href = "mailto:" + this.email + "?subject="+this.subject+"&body=" + this.body;
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  async presentAlert(msg:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
