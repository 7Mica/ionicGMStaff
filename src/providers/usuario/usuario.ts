import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

	usuario: Credenciales = { };

  constructor() { }


  cargarUsuario(nombre: string, 
  	email: string, 
  	img: string, 
  	uid: string, 
  	provider: string){


  	this.usuario.nombre = nombre;  
  	this.usuario.email = email;
  	this.usuario.img = img;
  	this.usuario.uid = uid;  
  	this.usuario.provider = provider; 

  }

}


export interface Credenciales {
	nombre?: string;
  	email?: string;
  	img?: string;
  	uid?: string;
  	provider?: string;

}
