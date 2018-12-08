import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MainPage } from './main';
import { MenuPage, ConferencesPage } from '../pages.index';

@NgModule({
  declarations: [
    MainPage,
    MenuPage,
    ConferencesPage
  ],
  entryComponents: [
    MainPage,
    MenuPage,
    ConferencesPage
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
  ],
  providers: [
    BarcodeScanner
  ]
})
export class MainPageModule {}
