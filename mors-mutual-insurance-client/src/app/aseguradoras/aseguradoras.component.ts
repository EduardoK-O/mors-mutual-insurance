import { Component, OnInit, inject } from '@angular/core';
import { AseguradorasService } from '../services/aseguradoras.service';
import { RouterLink } from '@angular/router';
import { Aseguradora } from '../model/aseguradora.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark, faUpLong} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aseguradoras',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './aseguradoras.component.html',
  styleUrl: './aseguradoras.component.css'
})
export class AseguradorasComponent implements OnInit{
  private aseguradoraService = inject(AseguradorasService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;
  faUpLong = faUpLong;

  aseguradoras: Aseguradora[] = [];

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.aseguradoraService.list().subscribe(aseguradoras =>{
      //console.log(aseguradoras);
      this.aseguradoras = aseguradoras;
    });
  }

  deleteAseguradora(idAseguradora: number){
    this.aseguradoraService.delete(idAseguradora).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }

  activarAseguradora(aseguradora: Aseguradora){//Kaz44654
    aseguradora.activo = 1;
    this.aseguradoraService.put(aseguradora.idAseguradora, aseguradora).subscribe(() => {
      alert("Ha sido activado");
      this.listAll();
    });
  }
}

