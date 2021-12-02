import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuardGuard } from './route-guard.guard';

const routes: Routes = [
  {
    
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.LoginPageModule),
    
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
    
    
  },
  {
    path: 'qrscan',
    loadChildren: () => import('./pages/qrscan/qrscan.module').then( m => m.QrscanPageModule),
    canActivate: [RouteGuardGuard]
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QrPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
