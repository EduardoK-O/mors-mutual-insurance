import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Marca } from '../model/marca.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/marcas';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.cookie.get('token')}`
  })

  list(){
    return this.http.get<Marca[]>('http://localhost:4000/api/marcas', {headers: this.headers});
  }

  create(marca: any){
    return this.http.post<Marca>(this.ruta, marca, {headers: this.headers});
  }

  get(idMarca: string){
    return this.http.get<Marca[]>(this.ruta + '/' + idMarca, {headers: this.headers});
  }

  put(idMarca: number, marca:any){
    //console.log(marca);
    return this.http.put(this.ruta + '/' + idMarca, marca, {headers: this.headers});
  }

  delete(idMarca: number){
    return this.http.delete(this.ruta + '/' + idMarca, {headers: this.headers});
  }
}
