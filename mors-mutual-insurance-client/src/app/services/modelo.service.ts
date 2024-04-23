import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modelo } from '../model/modelo.interface';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/modelos';

  list(){
    return this.http.get<Modelo[]>('http://localhost:4000/api/modelos');
  }

  create(modelo: any){
    return this.http.post<Modelo>(this.ruta, modelo);
  }

  get(idmodelo: string){
    return this.http.get<Modelo[]>(this.ruta + '/' + idmodelo);
  }

  put(idmodelo: number, modelo:any){
    //console.log(modelo);
    return this.http.put(this.ruta + '/' + idmodelo, modelo);
  }

  delete(idmodelo: number){
    return this.http.delete(this.ruta + '/' + idmodelo);
  }
}
