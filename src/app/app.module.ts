import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, isPlatform} from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import { NgxQRCodeModule } from 'ngx-qrcode2';

/*const getConfig = () => {
  if (isPlatform('hybrid')){
    return{
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'
    }
  }

  return{
    menuIcon: 'ellipsis-vertical'
  }
}*/

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, NgxQRCodeModule, IonicModule.forRoot({
    rippleEffect:false,
    mode:'md'
  }),
  AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRScanner],
  bootstrap: [AppComponent],
})
export class AppModule {}

