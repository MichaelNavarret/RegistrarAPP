import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiregionService } from 'src/app/services/apiregion.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  oculto:boolean = false;
  regiones: any[] = [];
  constructor(public modalController: ModalController, private router:Router) { 
    
  }

  ngOnInit() {
  }

  menuPass(){
    this.modalController.dismiss();
    this.router.navigate(['home/pass']);
  }
  closeModal(){
    this.modalController.dismiss();
  }
}
