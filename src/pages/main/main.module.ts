import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MainPage } from './main';
import { MenuPage, ConferencesPage } from '../pages.index';
import { LoginPage } from '../login/login';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { HttpClientModule } from '@angular/common/http';
import { EscaneoPageModule } from '../escaneo/escaneo.module';

@NgModule({
  declarations: [
    MainPage,
    MenuPage,
    ConferencesPage,
    LoginPage,
  ],
  entryComponents: [
    MainPage,
    MenuPage,
    ConferencesPage,
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    HttpClientModule,
    EscaneoPageModule
    

  ],
  providers: [
    BarcodeScanner,
    ApiRestProvider,
    
  ]
})
export class MainPageModule {}
