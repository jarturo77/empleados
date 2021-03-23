import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from './../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProviderMeta } from '@angular/compiler';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any = [];

 
  constructor(private _empleadoService: EmpleadoService,
              private toastr:ToastrService) {
                
   
   }

  ngOnInit(): void {
    this.getEmpleados() //inicilaizamos el metodo de getEmpleados
  }
  getEmpleados(){
    //metodo para obtener listado de empleados desde el servicio firebase
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.empleados=[];  //declaramos array empleados vacio
      data.forEach((element:any) => {
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
        //creamos un conjunto de elementos que incluya el id y todos los datos
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      console.log(this.empleados);
      
      
    });
  }
  //creacion de metodo eliminarEmpleado
  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(()=>{
      console.log('Empleado elimnado con exito');
      this.toastr.error('El empleado fue eliminado con exito','Registro eliminado!',{
        positionClass:'toast-bottom-right'
      })// mensaje de eliminacion
      
    }).catch(error =>{
      console.log(error);
    })
  }


}
