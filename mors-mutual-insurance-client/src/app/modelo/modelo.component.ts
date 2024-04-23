import { Component, OnInit, inject } from '@angular/core';
import { ModeloService } from '../services/modelo.service';
import { RouterLink } from '@angular/router';
import { Modelo } from '../model/modelo.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modelo',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './modelo.component.html',
  styleUrl: './modelo.component.css'
})
export class ModeloComponent {
  private modeloService = inject(ModeloService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;

  modelos: Modelo[] = [];

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.modeloService.list().subscribe(modelos =>{
      //console.log(modelos);
      this.modelos = modelos;
    });
  }

  deleteModelo(modelo: Modelo){
    modelo.activo = 0;
    this.modeloService.put(modelo.idModelo, modelo).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }
}
