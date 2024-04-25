import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConceptosService } from '../services/conceptos.service';
import { Concepto } from '../model/concepto.interface';

@Component({
  selector: 'app-conceptos-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './conceptos-form.component.html',
  styleUrl: './conceptos-form.component.css'
})
export class ConceptosFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private conceptosService = inject(ConceptosService);

  //parametros de la ruta
  @Input('id') idConcepto!: string;

  form?: FormGroup
  concepto?: Concepto

  ngOnInit(): void {
    if(this.idConcepto){
      this.get();
    }
    else{
      this.form = this.fb.group({
        idConcepto:['', [Validators.required]],
        descripcion:['', [Validators.required]],
        precio:['', [Validators.required]],
      })
    }
  }


  save(){
    const conceptoForm = this.form!.value;
    //console.log(conceptoForm);

    if(this.concepto){
      conceptoForm.activo = 1;
      this.conceptosService.put(this.concepto.idConcepto, conceptoForm).subscribe(() =>{
        this.router.navigate(['/conceptos']);
      });
    }
    else{
        this.conceptosService.create(conceptoForm).subscribe(() => {
        this.router.navigate(['/conceptos']);
      })
    }
    
  }

  get(){
    //const concepto: Concepto[] = [];
    this.conceptosService.get(this.idConcepto).subscribe(concepto => {
      //console.log(concepto);
      this.concepto = concepto[0];
      this.form = this.fb.group({
        idConcepto:[this.concepto.idConcepto, [Validators.required]],
        descripcion:[this.concepto.descripcion, [Validators.required]],
        precio:[this.concepto.precio, [Validators.required]],
      });
    });
  }
}
