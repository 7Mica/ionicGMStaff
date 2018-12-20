import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AyudaPage } from '../ayuda/ayuda';
import { CroquisPage } from '../croquis/croquis';
import { InfoeventoPage } from '../infoevento/infoevento';


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
    private app: App,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  cerrarSesion() {

    let alert = this.alertCtrl.create({
      title: 'Atención!',
      message: `¿Deseas cerrar sesión?`,

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            const loader = this.loadingCtrl.create({
              content: 'Cargando conferencias...'
            });

            loader.present();

            this.storage.clear().then(res => {
              this.app.getRootNav().setRoot(LoginPage);
              this.navCtrl.popToRoot();
              loader.dismiss();

            },
              error => {
                loader.dismiss();
                this.toast.create({ message: 'Ocurrió un error', duration: 3000 }).present();

              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  pushInfoEvento(evento: any) {
    this.navCtrl.push(InfoeventoPage);
  }

  pushCroquis(evento: any) {
    this.navCtrl.push(CroquisPage);
  }

  pushAyuda(evento: any) {
    this.navCtrl.push(AyudaPage);
  }

}
