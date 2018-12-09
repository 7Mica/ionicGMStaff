import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { toast } from '../../utils/toast';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private toast: ToastController,
    private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  cerrarSesion() {

    this.storage.remove('usuario').then(res => {      
      this.storage.remove('usuario');
      this.app.getRootNav().setRoot(LoginPage); 
      this.navCtrl.popToRoot();
      
    },
      error => {
        const conf = toast;
        conf.message = 'Ocurrió un error al cerrar sesión';
        this.toast.create(conf).present();

      }
    );


  }

}
