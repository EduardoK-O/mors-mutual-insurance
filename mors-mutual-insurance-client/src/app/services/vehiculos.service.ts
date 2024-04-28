import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculo } from '../model/vehiculo.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/vehiculos';
  private cookie = inject(CookieService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.cookie.get('token')}`
  })

  list(){
    console.log(this.cookie.get('token'));
    
    return this.http.get<Vehiculo[]>('http://localhost:4000/api/vehiculos', {headers: this.headers});
  }

  create(vehiculo: any){
    return this.http.post<Vehiculo>(this.ruta, vehiculo, {headers: this.headers});
  }

  get(idVehiculo: string){
    return this.http.get<Vehiculo[]>(this.ruta + '/' + idVehiculo, {headers: this.headers});
  }

  put(idVehiculo: number, vehiculo:any){
    //console.log(vehiculo);
    return this.http.put(this.ruta + '/' + idVehiculo, vehiculo, {headers: this.headers});
  }

  delete(idVehiculo: number){
    return this.http.delete(this.ruta + '/' + idVehiculo, {headers: this.headers});
  }
}
