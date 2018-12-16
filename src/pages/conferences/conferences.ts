import { Component } from '@angular/core';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';
import { NavController, App, LoadingController } from 'ionic-angular';
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
    private app: App,
    public loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    this.getConferencias();
    this.getInfoEvento();
  }

  escanear(item) {
    console.log(item);

    this.app.getRootNav().push(EscaneoPage, { data: item });
  }

  async getInfoEvento() {
    const loader = this.loadingCtrl.create({
      content: 'Cargando información...'
    });
    loader.present();
    this.api.getEventoInfo(await this.storage.get('usuario').then(item => item.usuario.evento)).subscribe(
      (res: any) => {
        console.log(res);
        this.storage.set('evento', res.data);
        loader.dismiss();
      }
    );
  }


  async getConferencias(event?) {
    const loader = this.loadingCtrl.create({
      content: 'Cargando conferencias...'
    });
    loader.present();

    this.api.getConferencias(await this.storage.get('usuario').then(item => item.usuario.evento)).subscribe(
      (res: any) => {
        console.log(res);

        this.conferencias = res.conferencias.filter((conferencia: any) => {

          if (new Date(conferencia.fecha).getDate() === new Date().getDate() &&
            new Date(conferencia.fecha).getMonth() === new Date().getMonth() &&
            new Date(conferencia.fecha).getFullYear() === new Date().getFullYear()) {

            return conferencia;
          }
        });

        this.conferenciasParaManana = res.conferencias.filter((conferencia: any) => {

          if (new Date(conferencia.fecha).getDate() === new Date().getDate() + 1 &&
            new Date(conferencia.fecha).getMonth() === new Date().getMonth() &&
            new Date(conferencia.fecha).getFullYear() === new Date().getFullYear()) {
            console.log(conferencia);

            return conferencia;
          }
        });
        if (event) {

          event.complete();
        }
        loader.dismiss();
        console.log(this.conferenciasParaManana);

      },
      error => {
        if (event) {

          event.complete();
        }
        loader.dismiss();
        console.log(error);

      }
    );
  }


  // async getConferencias() {
  //   let asd = await
  //     this.storage.get('usuario').then(res => {
  //       return res;
  //     });
  //   // Conferencias para hoy
  //   this.api.getConferencias(asd.usuario.evento).subscribe(
  //     (resp: any) => {

  //       this.conferencias = resp.conferencias.filter(conferencia => {

  //         if (new Date(conferencia.fecha).getDay() === new Date().getDay() &&
  //           new Date(conferencia.fecha).getMonth() === new Date().getMonth() &&
  //           new Date(conferencia.fecha).getFullYear() === new Date().getFullYear()) {

  //           return conferencia;
  //         }

  //       });

  //     }, error => { });

  //   // Conferencias para mañana
  //   this.api.getConferencias(asd.usuario.evento).subscribe(
  //     (resp: any) => {

  //       this.conferenciasParaManana = resp.conferencias.filter(conferencia => {

  //         if (new Date(conferencia.fecha).getDay() === new Date().getDay() + 1 &&
  //           new Date(conferencia.fecha).getMonth() === new Date().getMonth() &&
  //           new Date(conferencia.fecha).getFullYear() === new Date().getFullYear()) {

  //           return conferencia;
  //         }

  //       });

  //     }, error => { });


  // }


}
