import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { MainPage } from '../pages.index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  todo: FormGroup;
  evento: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private api: ApiRestProvider,
    private barcodeScanner: BarcodeScanner,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {

    this.todo = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

  }

  ionViewDidLoad() { }

  async scanEventCode() {
    this.evento = await this.barcodeScanner.scan().then(barcodeData => {

      return barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }


  async loginForm() {
    if (!this.evento) {
      this.showToast('No se escaneó el evento', 2000);
      return;
    }
    const data = this.todo.value;
    data.evento = this.evento;

    const loader = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });
    loader.present();
    this.api.loginUsuario(data).subscribe(
      (res: any) => {
        this.storage.set('usuario', res.data).then(re => {

          this.navCtrl.push(MainPage).then(r => {

            const index = this.navCtrl.getActive().index;
            this.navCtrl.remove(0, index);

          });
        }).catch(e => console.log(e));

        loader.dismiss();

      }, error => {
        loader.dismiss();
        this.showToast("Contraseña o correo incorrectos.", 2000);
      });

  }

  showToast(mensaje: string, duracion: number) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duracion
    });

    toast.present();
  }

  showRegistro() {
    console.log('Registro');

    // this.navCtrl.push(this.registro);

  }

}
