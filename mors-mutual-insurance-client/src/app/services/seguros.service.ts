import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seguro } from '../model/seguro.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/seguros';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.cookie.get('token')}`
  })

  list(){
    return this.http.get<Seguro[]>('http://localhost:4000/api/seguros', {headers: this.headers});
  }

  create(seguro: any){
    return this.http.post<Seguro>(this.ruta, seguro, {headers: this.headers});
  }

  get(idSeguro: string){
    return this.http.get<Seguro[]>(this.ruta + '/' + idSeguro, {headers: this.headers});
  }

  put(idSeguro: number, seguro:any){
    //console.log(seguro);
    return this.http.put(this.ruta + '/' + idSeguro, seguro, {headers: this.headers});
  }

  delete(idSeguro: number){
    return this.http.delete(this.ruta + '/' + idSeguro, {headers: this.headers});
  }
}
