import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { MenuPage, ConferencesPage } from '../pages.index';


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
    
  ) {  }


  ionViewDidLoad() {

  }

}
