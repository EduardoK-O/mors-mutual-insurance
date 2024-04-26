import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormControl } from '@angular/forms';
import { Cotizacion } from '../model/cotizacion.interface';
import { Asegurado } from '../model/asegurado.interface';
import { Seguro } from '../model/seguro.interface';
import { CotizacionesService } from '../services/cotizaciones.service';
import { AseguradosService } from '../services/asegurados.service';
import { SegurosService } from '../services/seguros.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  private fb = inject(FormBuilder);
  private cotizacionesService = inject(CotizacionesService);
  private aseguradosService = inject(AseguradosService);
  private segurosService = inject(SegurosService);

  totalCotizaciones: number = 0;
  totalSegurosConVencidos: number = 0;
  totalSeguros: number = 0;
  cotizaciones: Cotizacion[] = [];
  seguros: Seguro[] = [];
  asegurado?: Asegurado;
  cotizacion?: Cotizacion;

  reporte = new FormControl();
  form?: FormGroup

  ngOnInit(): void {
    this.listAll();
    console.log(this.cotizaciones);
    

    this.cotizaciones.forEach(cotizacion => {
      console.log(cotizacion.total);
      this.totalCotizaciones += cotizacion.total;
    });

    this.seguros.forEach(seguro => {
      this.totalSeguros += seguro.monto_cotizacion;
    });
  }

  listAll(){
    this.cotizacionesService.list().subscribe(cotizaciones =>{
      this.cotizaciones = cotizaciones;
      cotizaciones.map(async (cotizacion) =>{
        this.aseguradosService.get(cotizacion.idAsegurado.toString()).subscribe(data => {
          this.asegurado = data[0];
          cotizacion.nombre_asegurado = this.asegurado.nombre;
        });
      });

      this.cotizaciones.forEach(cotizacion => {
        this.totalCotizaciones += cotizacion.total;
      });
    });

    this.segurosService.list().subscribe(seguros =>{
      this.seguros = seguros;
      seguros.map(async (seguro) =>{
        this.cotizacionesService.get(seguro.idCotizacion.toString()).subscribe(data => {
          this.cotizacion = data[0];
          const fecha = new Date(seguro.fecha_vigencia.substring(0,10));
          const fechaActual = new Date();
          const diferenciaMilisegundos: number = fecha.getTime() - fechaActual.getTime();
          const diferenciaDias: number = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
          seguro.vence_en_dias = diferenciaDias;
          seguro.fecha_contratacion = seguro.fecha_contratacion.substring(0,10);
          seguro.fecha_vigencia = seguro.fecha_vigencia.substring(0,10);
          
          seguro.monto_cotizacion = this.cotizacion.total;

          if(diferenciaDias >= 0){
            this.totalSeguros += this.cotizacion.total;
            this.totalSegurosConVencidos += this.cotizacion.total;
          }
          else{
            this.totalSegurosConVencidos += this.cotizacion.total;
          }
          
        });
      });

      seguros.forEach(seguro => {
        const fecha = new Date(seguro.fecha_vigencia.substring(0,10));
        const fechaActual = new Date();
        const diferenciaMilisegundos: number = fecha.getTime() - fechaActual.getTime();
        const diferenciaDias: number = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
        seguro.vence_en_dias = diferenciaDias;
        seguro.fecha_contratacion = seguro.fecha_contratacion.substring(0,10);
        seguro.fecha_vigencia = seguro.fecha_vigencia.substring(0,10);
      });
    });
  }

  decrease() {
    const modeloForm = this.form!.value;
    let value = modeloForm.dias;
    if(value > 1) {
      value--;
      //$(this).parent().find('[data-value]').val(value);
      this.form = this.fb.group({
        dias: [value, [Validators.required]],
      });
    }
  }
  
  increase() {
    const modeloForm = this.form!.value;
    let value = modeloForm.dias;
    if(value < 100) {
      value++;
      //$(this).parent().find('[data-value]').val(value);
      this.form = this.fb.group({
        dias: [value, [Validators.required]],
      });
    }
  }
  
  valueChange() {
    const modeloForm = this.form!.value;
    let value = modeloForm.dias;
    if(value == undefined || isNaN(value) == true || value <= 0) {
      //$(this).val(1);
      this.form = this.fb.group({
        dias: [1, [Validators.required]],
      });
    } else if(value >= 101) {
      //$(this).val(100);
      this.form = this.fb.group({
        dias: [1, [Validators.required]],
      });
    }
  }

  currencyFormatter(currency: any, value: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }
}
