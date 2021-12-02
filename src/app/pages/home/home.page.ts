import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { bdasistenciaService } from 'src/app/services/bdasistencia.service';
import { BdlocalService } from 'src/app/services/bdlocal.service';
import { ModalPage } from '../../modal/modal/modal.page'

@Component({
  selector: 'app-login',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private menu: MenuController, private router:Router, public modalController: ModalController, private bdLocal:BdlocalService,
              private atehntication: AuthenticationService, private asisBD:bdasistenciaService) {

    
   }

  ngOnInit() {
    this.router.navigate(['home/home']);
  }

  ionViewWillEnter(){
    console.log("Prueba")
    this.atehntication.isAuthenticate();
    const size = this.bdLocal.sesion.length;
    if (size==0){
      this.bdLocal.registrarUsurio("197983892","3892","Michael Navarrete",'alumno');
      this.bdLocal.registrarUsurio("192518156","8156","Fernanda Arambarri",'alumno');
      this.bdLocal.registrarUsurio("100834545","4545","Fanny Cartes",'profesor');
    }
    if(this.atehntication.isAuthenticate()){
        if(this.atehntication.getUser()!=null){
          const index = this.bdLocal.sesion.findIndex(c=>c.strUsuario===this.atehntication.getUser());
          const username = this.bdLocal.sesion[index].strNombre;
          let navigationExtras: NavigationExtras = {
            state: {user:username}
          };
          if(this.bdLocal.sesion[index].strTipo=="alumno"){
            console.log("Sesion abierta del usuario " + username);
            this.router.navigate(['/usuario'],navigationExtras);
          }else{
            this.router.navigate(['/qr'],navigationExtras);
          }
        }
    }
  }

  
  //------------------- Metodos menú
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
    
  }

  cerrarMenu(){
    this.menu.close();
  }
  //------------------- 
  //------------------------Mis Metodos
  login(){
    this.router.navigate(['home/login']);
    this.cerrarMenu();
  }

  recuperar(){
    this.router.navigate(['home/pass']);
    this.cerrarMenu();
  }

  soporte(){
    this.menu.close();
    this.presentModal();
  }
  //-------------------------
  
  segmentChanged($event){
    let direccion = $event.detail.value
    this.router.navigate(['home/'+direccion])
  }

  //Metodos Ionic
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}

