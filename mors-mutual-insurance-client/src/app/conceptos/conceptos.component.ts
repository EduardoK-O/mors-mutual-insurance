import { Component, OnInit, inject } from '@angular/core';
import { ConceptosService } from '../services/conceptos.service';
import { RouterLink } from '@angular/router';
import { Concepto } from '../model/concepto.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark, faUpLong} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-conceptos',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './conceptos.component.html',
  styleUrl: './conceptos.component.css'
})
export class ConceptosComponent implements OnInit{
  private conceptoService = inject(ConceptosService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;
  faUpLong = faUpLong;

  conceptos: Concepto[] = [];

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.conceptoService.list().subscribe(conceptos =>{
      //console.log(conceptos);
      this.conceptos = conceptos;
    });
  }

  deleteConcepto(idConcepto: number){
    this.conceptoService.delete(idConcepto).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }

  activarConcepto(concepto: Concepto){//Kaz44654
    concepto.activo = 1;
    this.conceptoService.put(concepto.idConcepto, concepto).subscribe(() => {
      alert("Ha sido activado");
      this.listAll();
    });
  }
}

