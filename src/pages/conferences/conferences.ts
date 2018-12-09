import { Component } from '@angular/core';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';
import { NavController, App } from 'ionic-angular';
import { EscaneoPage } from '../escaneo/escaneo';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-conferences',
  templateUrl: 'conferences.html',
})
export class ConferencesPage {

  conferencias: any[] = [];

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
    this.app.getRootNav().push(EscaneoPage); 
  }

  async getConferencias() {
    let asd = await
      this.storage.get('usuario').then(res => {
        return res;
      });



    this.api.getConferencias(asd.usuario.evento).subscribe(
      (resp: any) => {
        this.conferencias = resp.conferencias;

      }, error => {

      });
  }


}
