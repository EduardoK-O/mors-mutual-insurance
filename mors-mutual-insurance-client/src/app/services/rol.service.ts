import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from '../model/rol.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/usuario-roles';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.cookie.get('token')}`
  })

  list(){
    return this.http.get<Rol[]>('http://localhost:4000/api/usuario-roles', {headers: this.headers});
  }

  create(rol: any){
    return this.http.post<Rol>(this.ruta, rol, {headers: this.headers});
  }

  get(idRol: string){
    return this.http.get<Rol[]>(this.ruta + '/' + idRol, {headers: this.headers});
  }

  put(idRol: number, rol:any){
    //console.log(rol);
    return this.http.put(this.ruta + '/' + idRol, rol, {headers: this.headers});
  }

  delete(idRol: number){
    return this.http.delete(this.ruta + '/' + idRol, {headers: this.headers});
  }
}
