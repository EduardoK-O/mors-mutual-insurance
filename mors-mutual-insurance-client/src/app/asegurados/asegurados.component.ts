import { Component, OnInit, inject } from '@angular/core';
import { AseguradosService } from '../services/asegurados.service';
import { RouterLink } from '@angular/router';
import { Asegurado } from '../model/asegurado.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark, faUpLong} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asegurados',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './asegurados.component.html',
  styleUrl: './asegurados.component.css'
})
export class AseguradosComponent implements OnInit{
  private aseguradoService = inject(AseguradosService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;
  faUpLong = faUpLong;

  asegurados: Asegurado[] = [];

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.aseguradoService.list().subscribe(asegurado =>{
      //console.log(asegurado);
      this.asegurados = asegurado;
    });
  }

  deleteAsegurado(idAsegurado: number){
    this.aseguradoService.delete(idAsegurado).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }

  /*activarAsegurado(asegurado: Asegurado){//Kaz44654
    this.aseguradoService.put(asegurado.idAsegurado, asegurado).subscribe(() => {
      alert("Ha sido activado");
      this.listAll();
    });
  }*/
}
