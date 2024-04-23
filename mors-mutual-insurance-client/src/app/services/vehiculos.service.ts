import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../model/vehiculo.interface';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/vehiculos';

  list(){
    return this.http.get<Vehiculo[]>('http://localhost:4000/api/vehiculos');
  }

  create(vehiculo: any){
    return this.http.post<Vehiculo>(this.ruta, vehiculo);
  }

  get(idVehiculo: string){
    return this.http.get<Vehiculo[]>(this.ruta + '/' + idVehiculo);
  }

  put(idVehiculo: number, vehiculo:any){
    //console.log(vehiculo);
    return this.http.put(this.ruta + '/' + idVehiculo, vehiculo);
  }

  delete(idVehiculo: number){
    return this.http.delete(this.ruta + '/' + idVehiculo);
  }
}
