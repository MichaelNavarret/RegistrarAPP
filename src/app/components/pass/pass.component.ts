import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BdlocalService } from 'src/app/services/bdlocal.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss'],
})
export class PassComponent implements OnInit {
  user:any;
  pass:any;
  constructor(public toastController:ToastController, private bdLocal:BdlocalService, private alertController:AlertController) { }

  ngOnInit() {}


  //Mis Metodos
  recuperar(){
    const existe = this.bdLocal.sesion.find(c=>c.strUsuario===this.user);
    const index = this.bdLocal.sesion.findIndex(c=>c.strUsuario===this.user);
    if(this.user != null && this.pass != null){
      if(existe){
        if (this.bdLocal.sesion[index].strPassword != this.pass){
          this.bdLocal.setPass(this.user,this.pass);
          this.presentAlert();
        }else{
          this.presentToast("No puede utilizar la misma contraseña que ya posee");
        }
      }else{
        this.presentToast("Usuario no existe");
      }
    }else{
      this.presentToast("Ambos campos son obligatorios");
    }
  }

  //Metodos Ionic
  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'La contraseña se ha cambiado de manera exitosa',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
