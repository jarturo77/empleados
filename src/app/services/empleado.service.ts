import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }

//metodo para agragar datos de empleados a firebase
  agregarEmpleado(empleado: any): Promise<any>{
    return this.firestore.collection('empleados').add(empleado);

  }
  //metodo para obtener listado de datos de empleados desde firebase
  getEmpleados(): Observable<any>{
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges(); //regresa listado de elememtos de firebase ordenados por fecha de creacion

  }
}
