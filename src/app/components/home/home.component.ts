import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal/modal.page'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public modalController: ModalController, private router:Router ){ }

  ngOnInit() {}
  faq(){
    this.presentModal();
  }
  scan(){
    this.router.navigate(['/qrscan']);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
