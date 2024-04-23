import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MarcasService } from '../services/marcas.service';
import { Marca } from '../model/marca.interface';


@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './marca-form.component.html',
  styleUrl: './marca-form.component.css'
})
export class MarcaFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private marcaServices = inject(MarcasService);

  //parametros de la ruta
  @Input('id') idMarca!: string;

  form?: FormGroup
  marca_auto?: Marca

  ngOnInit(): void {
    if(this.idMarca){
      this.get();
    }
    else{
      this.form = this.fb.group({
        nombre:['', [Validators.required]],
      })
    }
  }


  save(){
    const marcaForm = this.form!.value;
    //console.log(marcaForm);

    if(this.marca_auto){
      this.marcaServices.put(this.marca_auto.idMarca, marcaForm).subscribe(() =>{
        this.router.navigate(['/marcas']);
      });
    }
    else{
        this.marcaServices.create(marcaForm).subscribe(() => {
        this.router.navigate(['/marcas']);
      })
    }
    
  }

  get(){
    const marca: Marca[] = [];
    this.marcaServices.get(this.idMarca).subscribe(marca => {
      //console.log(marca);
      this.marca_auto = marca[0];
      this.form = this.fb.group({
        nombre: [this.marca_auto.nombre, [Validators.required]]
      });
    });
  }
}
