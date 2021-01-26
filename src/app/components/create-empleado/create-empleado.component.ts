import { EmpleadoService } from './../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,private _empleadoService: EmpleadoService,
              private router:Router) {
    this.createEmpleado=this.fb.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      documento: ['',Validators.required],
      salario: ['',Validators.required]
    })
   }

  ngOnInit(): void {
  }
  agregarEmpleado(){
    this.submitted = true;

    if(this.createEmpleado.invalid){
      return;

    }
    const empleado: any ={
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
      

    }
    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      console.log('Empleado registrado con exito!');
      this.router.navigate(['/this.list-empleados'])
      
      
    }).catch(error =>{
      console.log(error);
    
    })
    
  }

}
