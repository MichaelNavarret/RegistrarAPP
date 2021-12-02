import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { bdasistenciaService } from 'src/app/services/bdasistencia.service';
import { BdlocalService } from 'src/app/services/bdlocal.service';

@Component({
  
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {
  data:any;
  constructor(private qrScanner: QRScanner, private router:Router, public alertController:AlertController, private asistBD:bdasistenciaService,
               private activeroute: ActivatedRoute, private bdLocal:BdlocalService) {
    this.scan();
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.data);
      }
    })
   }

  ngOnInit() {
  }

  scan(){
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

         
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text:string) => {
            console.log('Scanned something', text);
            this.presentAlert(text);
            let informacion = JSON.parse(text);
            console.log(this.data)
            console.log(informacion.idAsignatura)
            console.log(informacion.seccion)
            console.log(informacion.asignatura)
            console.log(informacion.docente)
            console.log(informacion.correo)
            this.asistBD.registrarAsistencia(this.data,informacion.idAsignatura,informacion.seccion,informacion.asignatura,informacion.docente,informacion.correo);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });
          this.qrScanner.resumePreview();

            // show camera preview
            this.qrScanner.show().then((data: QRScannerStatus) => {
              console.log('scaner show', data.showing);
            }, err => {
              alert(err);
            });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
  })
  .catch((e: any) => console.log('Error is', e));
  }

  async presentAlert(msg:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Código leído',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    
    this.router.navigate(['/usuario'])
  }

}
