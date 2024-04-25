import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cotizacion } from '../model/cotizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/cotizaciones';

  list(){
    return this.http.get<Cotizacion[]>('http://localhost:4000/api/cotizaciones');
  }

  create(cotizacion: any){
    return this.http.post<Cotizacion>(this.ruta, cotizacion);
  }

  get(idCotizacion: string){
    return this.http.get<Cotizacion[]>(this.ruta + '/' + idCotizacion);
  }

  put(idCotizacion: number, cotizacion:any){
    //console.log(cotizacion);
    return this.http.put(this.ruta + '/' + idCotizacion, cotizacion);
  }

  delete(idCotizacion: number){
    return this.http.delete(this.ruta + '/' + idCotizacion);
  }
}
