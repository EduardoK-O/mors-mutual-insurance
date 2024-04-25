import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Concepto } from '../model/concepto.interface';

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {
  private http = inject(HttpClient);
  private ruta = 'http://localhost:4000/api/conceptos';

  list(){
    return this.http.get<Concepto[]>('http://localhost:4000/api/conceptos');
  }

  create(concepto: any){
    return this.http.post<Concepto>(this.ruta, concepto);
  }

  get(idConcepto: string){
    return this.http.get<Concepto[]>(this.ruta + '/' + idConcepto);
  }

  put(idConcepto: number, concepto:any){
    //console.log(concepto);
    return this.http.put(this.ruta + '/' + idConcepto, concepto);
  }

  delete(idConcepto: number){
    return this.http.delete(this.ruta + '/' + idConcepto);
  }
}
