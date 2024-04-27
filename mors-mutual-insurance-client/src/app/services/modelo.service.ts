import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Modelo } from '../model/modelo.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/modelos';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.cookie.get('token')}`
  })

  list(){
    return this.http.get<Modelo[]>('http://localhost:4000/api/modelos', {headers: this.headers});
  }

  create(modelo: any){
    return this.http.post<Modelo>(this.ruta, modelo, {headers: this.headers});
  }

  get(idmodelo: string){
    return this.http.get<Modelo[]>(this.ruta + '/' + idmodelo, {headers: this.headers});
  }

  put(idmodelo: number, modelo:any){
    //console.log(modelo);
    return this.http.put(this.ruta + '/' + idmodelo, modelo, {headers: this.headers});
  }

  delete(idmodelo: number){
    return this.http.delete(this.ruta + '/' + idmodelo, {headers: this.headers});
  }
}
