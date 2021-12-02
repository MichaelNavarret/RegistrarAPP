import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './home-routing.module';

import { LoginPage } from './home.page';
import { HomeComponent } from 'src/app/components/home/home.component';
import { PassComponent } from 'src/app/components/pass/pass.component';
import { LoginComponent } from 'src/app/components/login/login.component';


import { ModalPage } from '../../modal/modal/modal.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, HomeComponent, PassComponent, LoginComponent, ModalPage],
  entryComponents: [ModalPage]
})
export class LoginPageModule {}
