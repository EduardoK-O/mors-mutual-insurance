import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);
  private cookie = inject(CookieService);
  private ruta = 'http://localhost:4000/api/usuarios';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.cookie.get('token')}`
  });

  list(){
    return this.http.get<Usuario[]>('http://localhost:4000/api/usuarios', {headers: this.headers});
  }

  create(usuario: any){
    return this.http.post<Usuario>(this.ruta, usuario);
  }

  get(idUsuario: string){
    return this.http.get<Usuario[]>(this.ruta + '/' + idUsuario);
  }

  put(idUsuario: number, usuario:any){
    //console.log(usuario);
    return this.http.put(this.ruta + '/' + idUsuario, usuario);
  }

  delete(idUsuario: number){
    return this.http.delete(this.ruta + '/' + idUsuario);
  }

  login(usuario: Usuario){
    return this.http.post(this.ruta + '/login', usuario);
  }
}
