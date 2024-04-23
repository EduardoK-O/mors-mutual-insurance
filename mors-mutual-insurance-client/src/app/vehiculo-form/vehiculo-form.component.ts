import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MarcasService } from '../services/marcas.service';
import { VehiculosService } from '../services/vehiculos.service';
import { Marca } from '../model/marca.interface';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ModeloService } from '../services/modelo.service';
import { Modelo } from '../model/modelo.interface';
import { VehiculosComponent } from '../vehiculos/vehiculos.component';
import { Vehiculo } from '../model/vehiculo.interface';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './vehiculo-form.component.html',
  styleUrl: './vehiculo-form.component.css'
})
export class VehiculoFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private vehiculoService = inject(VehiculosService);
  private modelosService = inject(ModeloService);

  marcaControl = new FormControl();
  modelos: Modelo[] = [];

  @Input('id') idVehiculo!: string;

  form?: FormGroup
  vehiculo?: Vehiculo

  ngOnInit(): void {
    this.modelosService.list().subscribe(modelos =>{
      //console.log(this.idVehiculo);
      this.modelos = modelos;
    });

    if(this.idVehiculo){
      this.get();
    }
    else{
      this.form = this.fb.group({
        anio:['', [Validators.required]],
        num_serie:['', [Validators.required]],
        idModelo:['', [Validators.required]]
      })
    }
  }


  save(){
    const vehiculoForm = this.form!.value;

    if(this.vehiculo){
      this.vehiculoService.put(this.vehiculo.idVehiculo, vehiculoForm).subscribe(() =>{
        this.router.navigate(['/vehiculos']);
      });
    }
    else{
        this.vehiculoService.create(vehiculoForm).subscribe(() => {
        this.router.navigate(['/vehiculos']);
      })
    }
    
  }

  get(){
    const vehiculo: Vehiculo[] = [];
    this.vehiculoService.get(this.idVehiculo).subscribe(vehiculo => {
      //console.log(vehiculo);
      this.vehiculo = vehiculo[0];
      this.form = this.fb.group({
        anio: [this.vehiculo.anio, [Validators.required]],
        num_serie: [this.vehiculo.num_serie, [Validators.required]],
        idModelo: [this.vehiculo.idModelo, [Validators.required]],
      });
    });
  }
}
