import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'list-empleados', pathMatch:'full'},
  {path: 'list-empleados',component: ListEmpleadosComponent },
  {path: 'create-empleado',component: CreateEmpleadoComponent},
  {path: '**',redirectTo: 'list-empleados', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
