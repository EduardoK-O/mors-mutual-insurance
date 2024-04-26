import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SegurosService } from '../services/seguros.service';
import { CotizacionesService } from '../services/cotizaciones.service';
import { Cotizacion } from '../model/cotizacion.interface';
import { Seguro } from '../model/seguro.interface';

@Component({
  selector: 'app-seguro-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './seguro-form.component.html',
  styleUrl: './seguro-form.component.css'
})
export class SeguroFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private segurosService = inject(SegurosService);
  private cotizacionesService = inject(CotizacionesService);

  marcaControl = new FormControl();

  cotizaciones: Cotizacion[] = [];

  @Input('id') idSeguro!: string;

  form?: FormGroup
  seguro?: Seguro

  ngOnInit(): void {
    this.cotizacionesService.list().subscribe(cotizaciones =>{
      //console.log(this.idSeguro);
      this.cotizaciones = cotizaciones;
    });

    if(this.idSeguro){
      this.get();
    }
    else{
      this.form = this.fb.group({
        fecha_contratacion:['', [Validators.required]],
        fecha_vigencia:['', [Validators.required]],
        idCotizacion:['', [Validators.required]],
        idSeguro:['', [Validators.required]]
      })
    }
  }


  save(){
    const modeloForm = this.form!.value;

    if(this.seguro){
      this.segurosService.put(this.seguro.idSeguro, modeloForm).subscribe(() =>{
        this.router.navigate(['/seguros']);
      });
    }
    else{
        this.segurosService.create(modeloForm).subscribe(() => {
        this.router.navigate(['/seguros']);
      })
    }
    
  }

  get(){
    this.segurosService.get(this.idSeguro).subscribe(seguro => {
      this.seguro = seguro[0];
      this.form = this.fb.group({
        fecha_contratacion: [this.seguro.fecha_contratacion, [Validators.required]],
        fecha_vigencia: [this.seguro.fecha_vigencia, [Validators.required]],
        idCotizacion: [this.seguro.idCotizacion, [Validators.required]],
        idSeguro: [this.seguro.idSeguro, [Validators.required]]
      });
    });
  }
}
