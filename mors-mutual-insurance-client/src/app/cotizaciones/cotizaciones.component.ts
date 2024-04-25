import { Component, OnInit, inject } from '@angular/core';
import { CotizacionesService } from '../services/cotizaciones.service';
import { AseguradosService } from '../services/asegurados.service';
import { RouterLink } from '@angular/router';
import { Cotizacion } from '../model/cotizacion.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark, faUpLong} from '@fortawesome/free-solid-svg-icons';
import { Asegurado } from '../model/asegurado.interface';

@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent implements OnInit{
  private cotizacionesService = inject(CotizacionesService);
  private aseguradosService = inject(AseguradosService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;
  faUpLong = faUpLong;

  cotizaciones: Cotizacion[] = [];
  asegurado?: Asegurado;
  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.cotizacionesService.list().subscribe(cotizaciones =>{
      this.cotizaciones = cotizaciones;
      cotizaciones.map(async (cotizacion) =>{
        this.aseguradosService.get(cotizacion.idAsegurado.toString()).subscribe(data => {
          this.asegurado = data[0];
          cotizacion.nombre_asegurado = this.asegurado.nombre;
        });
      })
    });
  }

  deleteCotizacion(idCotizacion: number){
    this.cotizacionesService.delete(idCotizacion).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }

  /*activarCotizacion(concepto: Cotizacion){//Kaz44654
    concepto.activo = 1;
    this.cotizacionesService.put(concepto.idCotizacion, concepto).subscribe(() => {
      alert("Ha sido activado");
      this.listAll();
    });
  }*/
}
