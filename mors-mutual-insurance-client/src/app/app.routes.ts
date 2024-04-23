import { Routes } from '@angular/router';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcaFormComponent } from './marca-form/marca-form.component';
import { ModeloFormComponent } from './modelo-form/modelo-form.component';
import { ModeloComponent } from './modelo/modelo.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoFormComponent } from './vehiculo-form/vehiculo-form.component';
import { AseguradorasComponent } from './aseguradoras/aseguradoras.component';
import { AseguradorasFormComponent } from './aseguradoras-form/aseguradoras-form.component';

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
];
