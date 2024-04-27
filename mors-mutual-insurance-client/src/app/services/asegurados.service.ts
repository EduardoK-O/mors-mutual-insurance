import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Asegurado } from '../model/asegurado.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AseguradosService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/asegurados';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.cookie.get('token')}`
  })

  list(){
    return this.http.get<Asegurado[]>('http://localhost:4000/api/asegurados', {headers: this.headers});
  }

  create(asegurado: any){
    return this.http.post<Asegurado>(this.ruta, asegurado, {headers: this.headers});
  }

  get(idAsegurado: string){
    return this.http.get<Asegurado[]>(this.ruta + '/' + idAsegurado, {headers: this.headers});
  }

  put(idAsegurado: number, asegurado:any){
    //console.log(asegurado);
    return this.http.put(this.ruta + '/' + idAsegurado, asegurado, {headers: this.headers});
  }

  delete(idAsegurado: number){
    return this.http.delete(this.ruta + '/' + idAsegurado, {headers: this.headers});
  }
}
