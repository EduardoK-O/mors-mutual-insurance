import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Asegurado } from '../model/asegurado.interface';

@Injectable({
  providedIn: 'root'
})
export class AseguradosService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/asegurados';

  list(){
    return this.http.get<Asegurado[]>('http://localhost:4000/api/asegurados');
  }

  create(asegurado: any){
    return this.http.post<Asegurado>(this.ruta, asegurado);
  }

  get(idAsegurado: string){
    return this.http.get<Asegurado[]>(this.ruta + '/' + idAsegurado);
  }

  put(idAsegurado: number, asegurado:any){
    //console.log(asegurado);
    return this.http.put(this.ruta + '/' + idAsegurado, asegurado);
  }

  delete(idAsegurado: number){
    return this.http.delete(this.ruta + '/' + idAsegurado);
  }
}
