import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cotizacion } from '../model/cotizacion.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/cotizaciones';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.cookie.get('token')}`
  })

  list(){
    return this.http.get<Cotizacion[]>('http://localhost:4000/api/cotizaciones', {headers: this.headers});
  }

  create(cotizacion: any){
    console.log("esto ya es dentro del servicio:");
    console.log(cotizacion);
    
    return this.http.post<Cotizacion>(this.ruta, cotizacion, {headers: this.headers});
  }

  get(idCotizacion: string){
    return this.http.get<Cotizacion[]>(this.ruta + '/' + idCotizacion, {headers: this.headers});
  }

  put(idCotizacion: number, cotizacion:any){
    //console.log(cotizacion);
    return this.http.put(this.ruta + '/' + idCotizacion, cotizacion, {headers: this.headers});
  }

  delete(idCotizacion: number){
    return this.http.delete(this.ruta + '/' + idCotizacion, {headers: this.headers});
  }
}
