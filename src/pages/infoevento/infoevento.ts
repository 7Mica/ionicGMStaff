import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-infoevento',
  templateUrl: 'infoevento.html',
})
export class InfoeventoPage {

  evento: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
  ) {
  }

  ionViewDidLoad() {
    this.getEventoInfo();
  }

  getEventoInfo(ev?) {
    this.storage.get('evento').then(
      res => {
        this.evento = res;
      }
    ).catch();
  }

}
