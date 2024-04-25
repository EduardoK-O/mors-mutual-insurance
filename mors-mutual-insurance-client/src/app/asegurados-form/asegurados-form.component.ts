import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AseguradosService } from '../services/asegurados.service';
import { Asegurado } from '../model/asegurado.interface';

@Component({
  selector: 'app-asegurados-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './asegurados-form.component.html',
  styleUrl: './asegurados-form.component.css'
})
export class AseguradosFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private aseguradosService = inject(AseguradosService);

  //parametros de la ruta
  @Input('id') idAsegurado!: string;

  form?: FormGroup
  asegurado?: Asegurado

  ngOnInit(): void {
    if(this.idAsegurado){
      this.get();
    }
    else{
      this.form = this.fb.group({
        idAsegurado:['', [Validators.required]],
        nombre:['', [Validators.required]],
        fecha_nacimiento:['', [Validators.required]],
        direccion:['', [Validators.required]],
        correo:['', [Validators.required]],
      })
    }
  }


  save(){
    const aseguradoForm = this.form!.value;

    if(this.asegurado){
      aseguradoForm.activo = 1;
      this.aseguradosService.put(this.asegurado.idAsegurado, aseguradoForm).subscribe(() =>{
        this.router.navigate(['/asegurados']);
      });
    }
    else{
        this.aseguradosService.create(aseguradoForm).subscribe(() => {
        this.router.navigate(['/asegurados']);
      })
    }
    
  }

  get(){
    this.aseguradosService.get(this.idAsegurado).subscribe(asegurado => {
      this.asegurado = asegurado[0];
      this.form = this.fb.group({
        idAsegurado:[this.asegurado.idAsegurado, [Validators.required]],
        nombre:[this.asegurado.nombre, [Validators.required]],
        fecha_nacimiento:[this.asegurado.fecha_nacimiento, [Validators.required]],
        direccion:[this.asegurado.direccion, [Validators.required]],
        correo:[this.asegurado.correo, [Validators.required]],
      });
    });
  }
}
