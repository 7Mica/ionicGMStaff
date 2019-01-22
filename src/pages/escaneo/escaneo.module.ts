import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscaneoPage } from './escaneo';

@NgModule({
  declarations: [
    EscaneoPage,
  ],

  entryComponents: [
    EscaneoPage
  ],
  imports: [
    IonicPageModule.forChild(EscaneoPage),
  ],
})
export class EscaneoPageModule {}
