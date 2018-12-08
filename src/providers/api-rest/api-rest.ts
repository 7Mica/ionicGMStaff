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
  apiUrlAnadicUsuario = "http://localhost:3000/";

	constructor(public http: HttpClient) {
    	console.log('Hello ApiRestProvider Provider');
  	}
// Registro de usuario
  nuevoUsuario(data: any){

    return this.http.post( this.apiUrlAnadicUsuario+'usuario', data, httpOptions );
  }

// Login de usuario
  loginUsuario(data: any){
    return this.http.post(this.apiUrlAnadicUsuario+'login', data, httpOptions);
  }

  getUsers() {
  		return new Promise(resolve => {
    		this.http.get(this.apiUrl+'/users').subscribe(data => {
      		resolve(data);
    		}, err => {
      			console.log(err);
    		});
  		});
	}

	

}
