import { Routes } from '@angular/router';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcaFormComponent } from './marca-form/marca-form.component';
import { ModeloFormComponent } from './modelo-form/modelo-form.component';
import { ModeloComponent } from './modelo/modelo.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoFormComponent } from './vehiculo-form/vehiculo-form.component';
import { AseguradorasComponent } from './aseguradoras/aseguradoras.component';
import { AseguradorasFormComponent } from './aseguradoras-form/aseguradoras-form.component';
import { AseguradosComponent } from './asegurados/asegurados.component';
import { AseguradosFormComponent } from './asegurados-form/asegurados-form.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { ConceptosFormComponent } from './conceptos-form/conceptos-form.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CotizacionFormComponent } from './cotizacion-form/cotizacion-form.component';
import { SegurosComponent } from './seguros/seguros.component';
import { SeguroFormComponent } from './seguro-form/seguro-form.component';

export const routes: Routes = [
    {path: 'marcas', component: MarcasComponent},
    {path: 'add-marca', component: MarcaFormComponent},
    {path: 'edit-marca/:id', component: MarcaFormComponent},
    {path: 'modelos', component: ModeloComponent},
    {path: 'add-modelo', component: ModeloFormComponent},
    {path: 'edit-modelo/:id', component: ModeloFormComponent},
    {path: 'vehiculos', component: VehiculosComponent},
    {path: 'add-vehiculo', component: VehiculoFormComponent},
    {path: 'edit-vehiculo/:id', component: VehiculoFormComponent},
    {path: 'aseguradoras', component: AseguradorasComponent},
    {path: 'add-aseguradora', component: AseguradorasFormComponent},
    {path: 'edit-aseguradora/:id', component: AseguradorasFormComponent},
    {path: 'asegurados', component: AseguradosComponent},
    {path: 'add-asegurado', component: AseguradosFormComponent},
    {path: 'edit-asegurado/:id', component: AseguradosFormComponent},
    {path: 'conceptos', component: ConceptosComponent},
    {path: 'add-concepto', component: ConceptosFormComponent},
    {path: 'edit-concepto/:id', component: ConceptosFormComponent},
    {path: 'cotizaciones', component: CotizacionesComponent},
    {path: 'add-cotizacion', component: CotizacionFormComponent},
    {path: 'edit-cotizacion/:id', component: CotizacionFormComponent},
    {path: 'seguros', component: SegurosComponent},
    {path: 'add-seguro', component: SeguroFormComponent},
    {path: 'edit-seguro/:id', component: SeguroFormComponent},
];
