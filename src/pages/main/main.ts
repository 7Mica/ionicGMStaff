import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { MenuPage, ConferencesPage } from '../pages.index';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  conferencesPage = ConferencesPage
  menuPage = MenuPage

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    
  ) {

    events.subscribe('user:logout', (e) => {
      console.log(e);

      this.navCtrl.popToRoot();
    });


  }


  ionViewDidLoad() {

  }





}
