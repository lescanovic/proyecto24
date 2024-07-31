import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../service/crud.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // Creamos coleccion local de productos -> la definimos como array
  coleccionProductos: Producto [] = [];
//Definimos formulario para los productos 

//Atributos alfanumeros sin string se inicializan con comillas simples 
//Atributos numericos se inicializan con 0


producto = new FormGroup ({
  nombre:new FormControl ('',Validators.required), 
  precio: new FormControl(0, Validators.required),
  descripcion: new FormControl('',Validators.required),
  categoria:  new FormControl('',Validators.required),
  imagen: new FormControl('',Validators.required),
  alt:  new FormControl('',Validators.required),
})


constructor( public servicioCrud : CrudService){}


}


