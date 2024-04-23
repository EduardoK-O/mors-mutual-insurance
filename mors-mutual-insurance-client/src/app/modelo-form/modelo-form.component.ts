import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MarcasService } from '../services/marcas.service';
import { Marca } from '../model/marca.interface';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ModeloService } from '../services/modelo.service';
import { Modelo } from '../model/modelo.interface';

@Component({
  selector: 'app-modelo-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './modelo-form.component.html',
  styleUrl: './modelo-form.component.css'
})
export class ModeloFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private marcasService = inject(MarcasService);
  private modelosService = inject(ModeloService);

  marcaControl = new FormControl();

  marcas: Marca[] = [];

  @Input('id') idModelo!: string;

  form?: FormGroup
  modelo_auto?: Modelo

  ngOnInit(): void {
    this.marcasService.list().subscribe(marcas =>{
      //console.log(this.idModelo);
      this.marcas = marcas;
    });

    if(this.idModelo){
      this.get();
    }
    else{
      this.form = this.fb.group({
        nombre:['', [Validators.required]],
        idMarca:['', [Validators.required]]
      })
    }
  }


  save(){
    const modeloForm = this.form!.value;

    if(this.modelo_auto){
      this.modelosService.put(this.modelo_auto.idModelo, modeloForm).subscribe(() =>{
        this.router.navigate(['/modelos']);
      });
    }
    else{
        this.modelosService.create(modeloForm).subscribe(() => {
        this.router.navigate(['/modelos']);
      })
    }
    
  }

  get(){
    const modelo: Modelo[] = [];
    this.modelosService.get(this.idModelo).subscribe(modelo => {
      //console.log(modelo);
      this.modelo_auto = modelo[0];
      this.form = this.fb.group({
        nombre: [this.modelo_auto.nombre, [Validators.required]],
        idMarca: [this.modelo_auto.idMarca, [Validators.required]]
      });
    });
  }

}
