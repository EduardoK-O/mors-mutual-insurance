import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seguro } from '../model/seguro.interface';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/seguros';

  list(){
    return this.http.get<Seguro[]>('http://localhost:4000/api/seguros');
  }

  create(seguro: any){
    return this.http.post<Seguro>(this.ruta, seguro);
  }

  get(idSeguro: string){
    return this.http.get<Seguro[]>(this.ruta + '/' + idSeguro);
  }

  put(idSeguro: number, seguro:any){
    //console.log(seguro);
    return this.http.put(this.ruta + '/' + idSeguro, seguro);
  }

  delete(idSeguro: number){
    return this.http.delete(this.ruta + '/' + idSeguro);
  }
}
