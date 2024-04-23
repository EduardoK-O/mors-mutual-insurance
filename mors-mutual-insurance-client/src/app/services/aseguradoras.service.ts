import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Aseguradora } from '../model/aseguradora.interface';

@Injectable({
  providedIn: 'root'
})
export class AseguradorasService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/aseguradoras';

  list(){
    return this.http.get<Aseguradora[]>('http://localhost:4000/api/aseguradoras');
  }

  create(aseguradora: any){
    return this.http.post<Aseguradora>(this.ruta, aseguradora);
  }

  get(idAseguradora: string){
    return this.http.get<Aseguradora[]>(this.ruta + '/' + idAseguradora);
  }

  put(idAseguradora: number, aseguradora:any){
    //console.log(aseguradora);
    return this.http.put(this.ruta + '/' + idAseguradora, aseguradora);
  }

  delete(idAseguradora: number){
    return this.http.delete(this.ruta + '/' + idAseguradora);
  }
}
