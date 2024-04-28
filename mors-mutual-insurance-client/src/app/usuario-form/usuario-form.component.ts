import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RolService } from '../services/rol.service';
import { Rol } from '../model/rol.interface';
import { Usuario } from '../model/usuario.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usuarioService = inject(UsuariosService);
  private rolesService = inject(RolService);
  private cookoe = inject(CookieService);

  marcaControl = new FormControl();
  roles: Rol[] = [];

  @Input('id') idUsuario!: string;

  form?: FormGroup
  usuario?: Usuario

  ngOnInit(): void {
    this.rolesService.list().subscribe(roles =>{
      //console.log(this.idUsuario);
      console.log("El idRol del usuario es: " + this.cookoe.get('userRol'));
      
      this.roles = roles;
    });

    if(this.idUsuario){
      this.get();
    }
    else{
      this.form = this.fb.group({
        nombre:['', [Validators.required]],
        username:['', [Validators.required]],
        password:['', [Validators.required]],
        correo:['', [Validators.required]],
        idRol:['', [Validators.required]],
        idUsuario:['', [Validators.required]]
      })
    }
  }


  save(){
    const usuarioForm = this.form!.value;

    if(this.usuario){
      this.usuarioService.put(this.usuario.idUsuario, usuarioForm).subscribe(() =>{
        this.router.navigate(['/usuarios']);
      });
    }
    else{
        this.usuarioService.create(usuarioForm).subscribe(() => {
        this.router.navigate(['/usuarios']);
      })
    }
    
  }

  get(){
    const usuario: Usuario[] = [];
    this.usuarioService.get(this.idUsuario).subscribe(usuario => {
      //console.log(usuario);
      this.usuario = usuario[0];
      this.form = this.fb.group({
        nombre: [this.usuario.nombre, [Validators.required]],
        username: [this.usuario.username, [Validators.required]],
        password: [this.usuario.password, [Validators.required]],
        correo: [this.usuario.correo, [Validators.required]],
        idRol: [this.usuario.idRol, [Validators.required]],
        idUsuario: [this.usuario.idUsuario, [Validators.required]],
      });
    });
  }
}
