import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the EscaneoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escaneo',
  templateUrl: 'escaneo.html',
})
export class EscaneoPage {

  data: any;
  asistente: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiRestProvider,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController
  ) {



  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    console.log(this.navParams.get('data'));

    console.log(this.data);
  }

  async scanEventCode() {
    this.asistente = await this.barcodeScanner.scan().then(barcodeData => {
      console.log(barcodeData);

      return barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });

    this.api.registrarAsistencia(this.asistente, this.data._id, this.data.evento).subscribe(
      res => {
        this.toastCtrl.create({message: 'Asistencia registrada correctamente', duration: 3000}).present();

      },
      (error: any) => {
        console.log('ERROR', error.error);
        this.toastCtrl.create({message: 'Error: '+error.error.error, duration: 3000}).present();
      }
    );
  }

}
