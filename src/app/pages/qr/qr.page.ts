import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdlocalService } from 'src/app/services/bdlocal.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  data:any;
  idAsig:any;
  secc:any;
  asig:any;
  doc:any;
  email:any;
  createdCode = null;
  constructor(private bdLocal:BdlocalService, private router:Router, private activeroute: ActivatedRoute,
               public alertController: AlertController,public toastController: ToastController) { 
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.data);
      }
    })
  }

  ngOnInit() {
  }
  createdCodes(){
    if (this.idAsig!=null && this.secc!=null && this.asig != null && this.email!=null){
      this.doc=this.data;
      this.createdCode = JSON.stringify({"idAsignatura":this.idAsig, "seccion":this.secc, "asignatura":this.asig, "docente":this.doc,
                                          "correo":this.email})
    }else{
      this.presentToast();
    }
  }
  exit(){
    this.bdLocal.cerrarSesion(this.data);
    this.router.navigate(['/home/login']);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Todos los campos son obligatorios',
      duration: 2000
    });
    toast.present();
  }
}
