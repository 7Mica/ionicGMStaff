import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiRestProvider {


  apiUrl = "https://jsonplaceholder.typicode.com";
  api = "http://192.168.0.8:3000/";

  constructor(public http: HttpClient) {
    console.log('Hello ApiRestProvider Provider');
  }

  getConferencias(idevento) {
    const url = this.api + 'conferencia/lista/' + idevento;
    return this.http.get(url);
    
  }
  

  // Login de usuario
  loginUsuario(data: any) {
    return this.http.post(this.api + 'login/usuarioevento', data, httpOptions);
  }




}
