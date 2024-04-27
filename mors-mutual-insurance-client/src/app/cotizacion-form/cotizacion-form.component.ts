import { Component, importProvidersFrom, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Vehiculo } from '../model/vehiculo.interface';
import { Cotizacion } from '../model/cotizacion.interface';
import { Asegurado } from '../model/asegurado.interface';
import { Aseguradora } from '../model/aseguradora.interface';
import { Concepto } from '../model/concepto.interface';
import { CotizacionesService } from '../services/cotizaciones.service';
import { VehiculosService } from '../services/vehiculos.service';
import { AseguradosService } from '../services/asegurados.service';
import { AseguradorasService } from '../services/aseguradoras.service';
import { ConceptosService } from '../services/conceptos.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-cotizacion-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './cotizacion-form.component.html',
  styleUrl: './cotizacion-form.component.css'
})
export class CotizacionFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private vehiculosService = inject(VehiculosService);
  private cotizacionesService = inject(CotizacionesService);
  private aseguradosService = inject(AseguradosService);
  private aseguradorasService = inject(AseguradorasService);
  private conceptosService = inject(ConceptosService);

  cotizacionControl = new FormControl();

  vehiculos: Vehiculo[] = [];
  asegurados: Asegurado[] = [];
  aseguradoras: Aseguradora[] = [];
  conceptos: Concepto[] = [];
  concepto?: Concepto;

  @Input('id') idCotizacion!: string;

  form?: FormGroup;
  cotizacion?: Cotizacion;

  ngOnInit(): void {
    this.vehiculosService.list().subscribe(vehiculos =>{;
      this.vehiculos = vehiculos;
    });

    this.aseguradosService.list().subscribe(asegurados =>{
      this.asegurados = asegurados;
    });

    this.aseguradorasService.list().subscribe(aseguradoras =>{
      this.aseguradoras = aseguradoras;
    });

    this.conceptosService.list().subscribe(conceptos => {
      this.conceptos = conceptos;
    })

    if(this.idCotizacion){
      this.get();
    }
    else{
      this.form = this.fb.group({
        fecha:['', [Validators.required]],
        total:['', [Validators.required]],
        idAsegurado:['', [Validators.required]],
        idVehiculo:['', [Validators.required]],
        idAseguradora:['', [Validators.required]],
        prima_neta:['', [Validators.required]],
        descuento:['', [Validators.required]],
        prima_modulos:['', [Validators.required]],
        recargo_fraccionamiento:['', [Validators.required]],
        reduccion_autorizada:['', [Validators.required]],
        derecho_poliza:['', [Validators.required]],
        iva:['', [Validators.required]],
        conceptos:['', [Validators.required]],
        //idCotizacion:['', [Validators.required]]
      })
    }
  }

  save(){
    const modeloForm = this.form!.value;
    let conceptosSeleccionados: any[] = [];

    /*modeloForm.conceptos.forEach((idConcepto: number) => { //los ids asignados al multi select
      this.conceptosService.get(idConcepto.toString()).subscribe(concepto => { //hacemos getbyid a cada uno
        const data = concepto[0] //incesesario pero por cualquier cosa lo guardamos en data
        conceptosSeleccionados.push(data); //pusheamos data al array de conceptos seleccionados
      });
      
    });

    modeloForm.conceptos = conceptosSeleccionados; //asignamos al fomulario los conceptos

    console.log(modeloForm);

    //Aquí llamamos a los servicios que se conectan a la API
    if(this.cotizacion){
      this.cotizacionesService.put(this.cotizacion.idCotizacion, modeloForm).subscribe(() =>{
        this.router.navigate(['/cotizaciones']);
      });
    }
    else{
        this.cotizacionesService.create(modeloForm).subscribe(() => {
        this.router.navigate(['/cotizaciones']);
      })
    }*/

    // Creamos un array de observables para las llamadas get
    const observables = modeloForm.conceptos.map((idConcepto: number) => {
      return this.conceptosService.get(idConcepto.toString());
    });

  // Usamos forkJoin para esperar a que todas las llamadas se completen
    forkJoin(observables).subscribe((conceptos: any) => {
      // Una vez que todas las llamadas están completas, agregamos los conceptos al array conceptosSeleccionados
      conceptos.forEach((concepto: any) => {
        conceptosSeleccionados.push(concepto[0]);
      });

        // Ahora podemos asignar los conceptos al formulario
      modeloForm.conceptos = conceptosSeleccionados;

      console.log(modeloForm);

        // Llamamos a los servicios que se conectan a la API
      if (this.cotizacion) {
          this.cotizacionesService.put(this.cotizacion.idCotizacion, modeloForm).subscribe(() => {
            this.router.navigate(['/cotizaciones']);
          });
          
      }
      else {
        this.cotizacionesService.create(modeloForm).subscribe(() => {
          this.router.navigate(['/cotizaciones']);
        }); 
      }
    });

    setTimeout(() => {
      this.router.navigate(['/cotizaciones']);
    }, 3000);
  }

  get(){
    const cotizacion: Cotizacion[] = [];
    this.cotizacionesService.get(this.idCotizacion).subscribe(cotizacion => {

      this.cotizacion = cotizacion[0];
      let idsConceptos: number [] = [];

      this.cotizacion.conceptos.forEach(cotizacion => {
        idsConceptos.push(cotizacion.idConcepto);
      });

      this.form = this.fb.group({
        fecha:[this.cotizacion.fecha, [Validators.required]],
        total:[this.cotizacion.total, [Validators.required]],
        idAsegurado:[this.cotizacion.idAsegurado, [Validators.required]],
        idVehiculo:[this.cotizacion.idVehiculo, [Validators.required]],
        idAseguradora:[this.cotizacion.idAseguradora, [Validators.required]],
        prima_neta:[this.cotizacion.prima_neta, [Validators.required]],
        descuento:[this.cotizacion.descuento, [Validators.required]],
        prima_modulos:[this.cotizacion.prima_modulos, [Validators.required]],
        recargo_fraccionamiento:[this.cotizacion.recargo_fraccionamiento, [Validators.required]],
        reduccion_autorizada:[this.cotizacion.reduccion_autorizada, [Validators.required]],
        derecho_poliza:[this.cotizacion.derecho_poliza, [Validators.required]],
        iva:[this.cotizacion.iva, [Validators.required]],
        conceptos:[idsConceptos, [Validators.required]],
        idCotizacion:[this.cotizacion.idCotizacion, [Validators.required]]
      });
    });
  }

}
