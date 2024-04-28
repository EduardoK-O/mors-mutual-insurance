import { Component, OnInit, inject } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { RouterLink } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faTimes, faCircleXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  private usuariosService = inject(UsuariosService);

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  check = faCheckCircle;
  times = faTimes;
  circleX = faCircleXmark;

  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.listAll();
    //console.log("usuarios funciona");
  }

  listAll(){
    this.usuariosService.list().subscribe(usuarios =>{
      console.log(usuarios);
      this.usuarios = usuarios;
    });
  }

  deleteUsuario(vehiculo: Usuario){
    //vehiculo.activo = 0;
    this.usuariosService.put(vehiculo.idUsuario, vehiculo).subscribe(() => {
      alert("Ha sido eliminado");
      this.listAll();
    });
  }
}
