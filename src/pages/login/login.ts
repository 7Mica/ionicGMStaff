import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { MainPage } from '../pages.index';

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

  todo : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private asd: ApiRestProvider
  ) {

    this.todo = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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


  loginForm() {
    let data = {
      "email": this.todo.value.email,
      "password": this.todo.value.password
    };


    this.asd.loginUsuario(JSON.stringify(data)).subscribe(data => {

      console.log(data);


      this.navCtrl.push(MainPage);




    }, error => {
      console.log(error.errors);
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
