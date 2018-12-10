import { Component } from '@angular/core';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';
import { NavController, App } from 'ionic-angular';
import { EscaneoPage } from '../escaneo/escaneo';


@Component({
  selector: 'page-conferences',
  templateUrl: 'conferences.html',
})
export class ConferencesPage {

  conferencias: any[] = [];
  conferenciasParaManana: any[] = [];

  constructor(
    private api: ApiRestProvider,
    private storage: Storage,
    public navCtrl: NavController,
    private app: App
  ) {

    this.getConferencias();
  }

  escanear(item) {
    console.log(item);
    
    this.app.getRootNav().push(EscaneoPage, { data: item });
  }

  async getConferencias() {
    let asd = await
      this.storage.get('usuario').then(res => {
        return res;
      });
    // Conferencias para hoy
    this.api.getConferencias(asd.usuario.evento).subscribe(
      (resp: any) => {

        this.conferencias = resp.conferencias.filter(conferencia => {
         
          if (new Date(conferencia.fecha).getDay() === new Date().getDay() &&
            new Date(conferencia.fecha).getMonth() === new Date().getMonth() &&
            new Date(conferencia.fecha).getFullYear() === new Date().getFullYear()) {

            return conferencia;
          }

        });

      }, error => { });

      // Conferencias para mañana
      this.api.getConferencias(asd.usuario.evento).subscribe(
        (resp: any) => {
  
          this.conferenciasParaManana = resp.conferencias.filter(conferencia => {
            
            if (new Date(conferencia.fecha).getDay() === new Date().getDay()+1 &&
              new Date(conferencia.fecha).getMonth() === new Date().getMonth() &&
              new Date(conferencia.fecha).getFullYear() === new Date().getFullYear()) {
  
              return conferencia;
            }
  
          });
  
        }, error => { });


  }


}
