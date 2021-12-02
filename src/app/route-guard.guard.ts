import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { BdlocalService } from './services/bdlocal.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {
  constructor( private router:Router, private bdLocal: BdlocalService, private autehntication:AuthenticationService,
                public alertController: AlertController){

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.autehntication.isAuthenticate()){
      return true;
    }else{
      this.presentAlert();
      return false;
    }
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Imposible ingresar',
      subHeader: 'No ha ingresado sesion',
      message: 'Por favor, ingrese sesión para utilizar esta funcion',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    this.router.navigate(['/home/login']);
  }
}
