import { Component, OnInit, inject } from '@angular/core';
import { VehiculosService } from '../services/vehiculos.service';
import { RouterLink } from '@angular/router';
import { Vehiculo } from '../model/vehiculo.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent {
  private vehiculoService = inject(VehiculosService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;

  vehiculos: Vehiculo[] = [];

  ngOnInit(): void {
    this.listAll();
    //console.log("vehiculos funciona");
  }

  listAll(){
    this.vehiculoService.list().subscribe(vehiculos =>{
      console.log(vehiculos);
      this.vehiculos = vehiculos;
    });
  }

  deleteVehiculo(vehiculo: Vehiculo){
    //vehiculo.activo = 0;
    this.vehiculoService.put(vehiculo.idVehiculo, vehiculo).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }
}
