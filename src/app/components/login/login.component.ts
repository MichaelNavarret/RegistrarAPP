import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { BdlocalService } from 'src/app/services/bdlocal.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user:any;
  pass:any;
  usuario:any;
  constructor(public toastController: ToastController, public bdLocal: BdlocalService, private router:Router) { }

  ngOnInit() {}


  //-----------------------------------------------------------------------Mis Metodos
  iniciar(){
    const nomExist = this.bdLocal.sesion.find(c=>c.strUsuario===this.user);
    
    const index = this.bdLocal.sesion.findIndex(c=>c.strUsuario===this.user);
    console.log(this.bdLocal.sesion[index].strNombre)
    const username = this.bdLocal.sesion[index].strNombre;
    let navigationExtras: NavigationExtras = {
      state: {user:username}
    };
    console.log();
    console.log(index);
    if(this.user != null && this.pass != null){
      if(nomExist){
        if (this.bdLocal.sesion[index].strPassword == this.pass){
          this.bdLocal.iniciarSesion(this.user);
          const index2 = this.bdLocal.sesion.findIndex(c=>c.strUsuario === this.user);
          if(this.bdLocal.sesion[index2].strTipo == "alumno"){
            this.router.navigate(['/usuario'],navigationExtras)
          } else{
            this.router.navigate(['/qr'],navigationExtras)
          }
        }else{
          this.presentToast("Contraseña incorrecta");
        }
      }else{
        this.presentToast('Usuario no existe');
      }
    }else{
      this.presentToast("Ambos campos son obligatorios");
    }
  }

  //---------------------------------------------------------------------Metodos IONIC

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
