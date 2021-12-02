import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PassComponent } from 'src/app/components/pass/pass.component';

import { LoginPage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,

    children:[
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'pass',
        component: PassComponent
      },
      {
        path:'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
