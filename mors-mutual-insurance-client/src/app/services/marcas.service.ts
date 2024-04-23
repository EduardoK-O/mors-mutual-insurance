import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Marca } from '../model/marca.interface';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/marcas';

  list(){
    return this.http.get<Marca[]>('http://localhost:4000/api/marcas');
  }

  create(marca: any){
    return this.http.post<Marca>(this.ruta, marca);
  }

  get(idMarca: string){
    return this.http.get<Marca[]>(this.ruta + '/' + idMarca);
  }

  put(idMarca: number, marca:any){
    //console.log(marca);
    return this.http.put(this.ruta + '/' + idMarca, marca);
  }

  delete(idMarca: number){
    return this.http.delete(this.ruta + '/' + idMarca);
  }
}
