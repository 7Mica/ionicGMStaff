import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { MainPage } from '../pages.index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  todo: FormGroup;
  evento: any = '5c041bde7bc0781582f8b8b0';
  // evento: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private api: ApiRestProvider,
    private barcodeScanner: BarcodeScanner,
    private storage: Storage
  ) {

    this.todo = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
    this.todo.get('email').setValue('michel@gmail.com');
    this.todo.get('password').setValue('michel');
    this.scanEventCode();
  }

  ionViewDidLoad() {

  }

  showPswdRecovery() {

    let alert = this.alertCtrl.create({
      title: 'Recuperar contraseña',
      message: 'Coloca el email para recuperar tu contraseña.',
      inputs: [
        {
          name: "email",
          placeholder: "Correo electrónico"
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  scanEventCode() {
    this.barcodeScanner.scan().then(barcodeData => {

      this.evento = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }


  loginForm() {
    // if (!this.evento) {
    //   this.showToast('No se escaneó el evento', 2000);
    //   return;
    // }
    const data = this.todo.value;
    data.evento = this.evento;
    this.api.loginUsuario(data).subscribe((res: any) => {
      this.storage.set('usuario', res.data).then(
        res => {

        },
        error => {

        }
      );
      this.navCtrl.push(MainPage);

    }, error => {
      console.log(error);
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
