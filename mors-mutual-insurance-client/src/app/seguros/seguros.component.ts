import { Component, OnInit, inject } from '@angular/core';
import { SegurosService } from '../services/seguros.service';
import { CotizacionesService } from '../services/cotizaciones.service';
import { RouterLink } from '@angular/router';
import { Seguro } from '../model/seguro.interface';
import { Cotizacion } from '../model/cotizacion.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seguros',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './seguros.component.html',
  styleUrl: './seguros.component.css'
})
export class SegurosComponent {
  private segurosService = inject(SegurosService);
  private cotizacionesService = inject(CotizacionesService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;

  seguros: Seguro[] = [];
  cotizacion?: Cotizacion;

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.segurosService.list().subscribe(seguros =>{
      //console.log(seguros);
      this.seguros = seguros;
      /*seguros.map(async (seguro) =>{
        this.cotizacionesService.get(seguro.idCotizacion.toString()).subscribe(data => {
          this.cotizacion = data[0];
          cotizacion.nombre_asegurado = this.cotizacion.idAsegurado;
        });
      });*/
    });
  }

  deleteSeguro(seguro: Seguro){
    //seguro.activo = 0;
    this.segurosService.put(seguro.idSeguro, seguro).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }
}
