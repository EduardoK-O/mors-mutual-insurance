import { Component, OnInit, inject } from '@angular/core';
import { MarcasService } from '../services/marcas.service';
import { RouterLink } from '@angular/router';
import { Marca } from '../model/marca.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark, faUpLong} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent implements OnInit{
  private marcaService = inject(MarcasService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;
  faUpLong = faUpLong;

  marcas: Marca[] = [];

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.marcaService.list().subscribe(marcas =>{
      //console.log(marcas);
      this.marcas = marcas;
    });
  }

  deleteMarca(marca: Marca){
    marca.activo = 0;
    this.marcaService.put(marca.idMarca, marca).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }

  activarMarca(marca: Marca){//Kaz44654
    marca.activo = 1;
    this.marcaService.put(marca.idMarca, marca).subscribe(() => {
      alert("Ha sido activado");
      this.listAll();
    });
  }
}
