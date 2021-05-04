import { EmpleadoService } from './../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null; //variable de captura de id desde ruta
  titulo = 'Agregar Empleado';

  constructor(private fb: FormBuilder,private _empleadoService: EmpleadoService,
              private router:Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute    ///libreria para capturar id desde la ruta
              ) {
    this.createEmpleado=this.fb.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      documento: ['',Validators.required],
      salario: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');  //Captura de id paraa modificacion
    console.log(this.id );
    
   }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarEditarEmpleado(){
    this.submitted = true;

    if(this.createEmpleado.invalid){
      return;

    }
    if (this.id === null) {
      this.agregarEmpleado();
      
    }else{
      this.editarEmpleado(this.id);
    }
    
  }
  agregarEmpleado(){
    const empleado: any ={
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
      

    }
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      this.toastr.success('Empleado registrado con exito!', 'Empleado registrado');
      this.loading = false;
      this.router.navigate(['/this.list-empleados'])
      
      
    }).catch(error =>{
      console.log(error);
      this.loading = false;
    
    })

  }
  
  editarEmpleado(id: string){
    
    const empleado: any ={
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,

      fechaActualizacion: new Date()
      

    }
    this.loading = true;
    
    this._empleadoService.actualizarEmpleado(id, empleado).then(() =>{
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito','Empleado modificado',{
        positionClass: 'toast-bottom-right'
      })
        this.router.navigate(['/list-empleados']);
    })
  }

  esEditar(){
    
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this.loading = true;
      
      this._empleadoService.getEmpleado(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
        
        
        
      })
    }
  }

}
