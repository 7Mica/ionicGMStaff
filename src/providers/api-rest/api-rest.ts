import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../../config/config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiRestProvider {


  apiUrl = "https://jsonplaceholder.typicode.com";
  api = HOST;

  constructor(public http: HttpClient) {
  }

  getEventoInfo(idevento: string) {
    const url = this.api + 'evento/' + idevento;
    return this.http.get(url);
  }

  getConferencias(idevento: string) {
    const url = this.api + 'conferencia/lista/' + idevento;
    return this.http.get(url);

  }

  registrarAsistencia(idusuario, idconferencia, idevento) {    
    const url = this.api + `conferencia/asistencia/${idevento}/${idconferencia}/${idusuario}`;

    return this.http.put(url, {});
  }


  // Login de usuario
  loginUsuario(data: any) {
    return this.http.post(this.api + 'login/usuarioevento/staff', data, httpOptions);
  }




}
