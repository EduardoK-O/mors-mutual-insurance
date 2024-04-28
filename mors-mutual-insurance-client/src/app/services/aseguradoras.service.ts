import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Aseguradora } from '../model/aseguradora.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AseguradorasService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/aseguradoras';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.cookie.get('token')}`
  })

  list(){
    return this.http.get<Aseguradora[]>('http://localhost:4000/api/aseguradoras', {headers: this.headers});
  }

  create(aseguradora: any){
    return this.http.post<Aseguradora>(this.ruta, aseguradora, {headers: this.headers});
  }

  get(idAseguradora: string){
    return this.http.get<Aseguradora[]>(this.ruta + '/' + idAseguradora, {headers: this.headers});
  }

  put(idAseguradora: number, aseguradora:any){
    //console.log(aseguradora);
    return this.http.put(this.ruta + '/' + idAseguradora, aseguradora, {headers: this.headers});
  }

  delete(idAseguradora: number){
    return this.http.delete(this.ruta + '/' + idAseguradora, {headers: this.headers});
  }
}
