import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../model/usuario.interface';
import { sha256, sha224 } from 'js-sha256';
import { CookieService } from 'ngx-cookie-service';
import { data } from 'jquery';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usuariosService = inject(UsuariosService);
  private cookie = inject(CookieService);

  //parametros de la ruta
  @Input('id') idUsuario!: string;

  form?: FormGroup
  usuario?: Usuario

  ngOnInit(): void {
    this.form = this.fb.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]],
    })
  }


  login(){
    const usuarioForm = this.form!.value;
    //usuarioForm.password = sha256(usuarioForm.password);
    //sha256('The quick brown fox jumps over the lazy dog.');
    //console.log(usuarioForm);
    
    
      this.usuariosService.login(usuarioForm).subscribe((data:any) => {
        this.cookie.set('token', data.token);
        this.cookie.set('userRol', data.usuario.idRol);
        this.router.navigate(['/reportes']);
      })
  }
}
