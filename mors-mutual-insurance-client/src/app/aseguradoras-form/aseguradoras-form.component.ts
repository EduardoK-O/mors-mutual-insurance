import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AseguradorasService } from '../services/aseguradoras.service';
import { Aseguradora } from '../model/aseguradora.interface';

@Component({
  selector: 'app-aseguradoras-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './aseguradoras-form.component.html',
  styleUrl: './aseguradoras-form.component.css'
})
export class AseguradorasFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private aseguradoraService = inject(AseguradorasService);

  //parametros de la ruta
  @Input('id') idAseguradora!: string;

  form?: FormGroup
  aseguradora?: Aseguradora

  ngOnInit(): void {
    if(this.idAseguradora){
      this.get();
    }
    else{
      this.form = this.fb.group({
        idAseguradora:['', [Validators.required]],
        nombre:['', [Validators.required]],
        razon_social:['', [Validators.required]],
        contacto:['', [Validators.required]],
        correo:['', [Validators.required]],
        telefono:['', [Validators.required]],
        ext:['', [Validators.required]],
        celular:['', [Validators.required]],
        activo:['', [Validators.required]],
      })
    }
  }


  save(){
    const aseguradoraForm = this.form!.value;
    //console.log(aseguradoraForm);

    if(this.aseguradora){
      aseguradoraForm.activo = 1;
      this.aseguradoraService.put(this.aseguradora.idAseguradora, aseguradoraForm).subscribe(() =>{
        this.router.navigate(['/aseguradoras']);
      });
    }
    else{
        this.aseguradoraService.create(aseguradoraForm).subscribe(() => {
        this.router.navigate(['/aseguradoras']);
      })
    }
    
  }

  get(){
    //const aseguradora: Aseguradora[] = [];
    this.aseguradoraService.get(this.idAseguradora).subscribe(aseguradora => {
      //console.log(aseguradora);
      this.aseguradora = aseguradora[0];
      this.form = this.fb.group({
        idAseguradora:[this.aseguradora.idAseguradora, [Validators.required]],
        nombre:[this.aseguradora.nombre, [Validators.required]],
        razon_social:[this.aseguradora.razon_social, [Validators.required]],
        contacto:[this.aseguradora.contacto, [Validators.required]],
        correo:[this.aseguradora.correo, [Validators.required]],
        telefono:[this.aseguradora.telefono, [Validators.required]],
        ext:[this.aseguradora.ext, [Validators.required]],
        celular:[this.aseguradora.celular, [Validators.required]],
        activo:[this.aseguradora.activo, [Validators.required]],
      });
    });
  }
}
