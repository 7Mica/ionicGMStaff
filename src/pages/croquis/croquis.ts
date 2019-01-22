import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HOST } from '../../config/config';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-croquis',
  templateUrl: 'croquis.html',
})
export class CroquisPage {

  URLCROQUIS = HOST;
  directURL: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiRestProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.getCroquis();
  }

  async getCroquis() {
    const croquis = `${this.URLCROQUIS}evento/img/croquis/${await this.storage.get('evento').then(item => item.croquis)}`;
    this.directURL = croquis;
  }

}
