import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Concepto } from '../model/concepto.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/conceptos';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.cookie.get('token')}`
  })

  list(){
    return this.http.get<Concepto[]>('http://localhost:4000/api/conceptos', {headers: this.headers});
  }

  create(concepto: any){
    return this.http.post<Concepto>(this.ruta, concepto, {headers: this.headers});
  }

  get(idConcepto: string){
    return this.http.get<Concepto[]>(this.ruta + '/' + idConcepto, {headers: this.headers});
  }

  put(idConcepto: number, concepto:any){
    //console.log(concepto);
    return this.http.put(this.ruta + '/' + idConcepto, concepto, {headers: this.headers});
  }

  delete(idConcepto: number){
    return this.http.delete(this.ruta + '/' + idConcepto, {headers: this.headers});
  }
}
