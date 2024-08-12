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
productosSeleccionado!: Producto; 
modalVisibleProducto: boolean = false


producto = new FormGroup ({
  nombre:new FormControl ('',Validators.required), 
  precio: new FormControl(0, Validators.required),
  descripcion: new FormControl('',Validators.required),
  categoria:  new FormControl('',Validators.required),
  imagen: new FormControl('',Validators.required),
  alt:  new FormControl('',Validators.required),

  
})

constructor( public servicioCrud : CrudService){}
ngOnInit(): void {
   this.servicioCrud.obtenerProducto().subscribe(producto => {
    this.coleccionProductos = producto
   })
}
async agregarProducto(){
  if(this.producto.valid){
    let nuevoProducto: Producto ={
      //no toma al id al principio porque la bd lo agrega solo
      idProducto: '',
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.producto.value.imagen!,
      alt:this.producto.value.alt!,

    }
    await this.servicioCrud.crearProducto(nuevoProducto)
    .then(producto => {
      alert("Ha agregado un nuevo producto con exito!")
    })
    .catch (err =>{
      alert("Ha ocurrido un error al cargar el producto");
    });
  };
}

/**/
mostrarBorrar(productoSeleccionado: Producto){
  this.modalVisibleProducto = true;

  this.productosSeleccionado = productoSeleccionado
}


borrarProducto(){
  this.servicioCrud.eliminarProducto(this.productosSeleccionado.idProducto)
  .then(respuesta =>{
    alert("Se ha podido eliminar con exito")
  })
  .catch(error => {
    alert("Ha ocurrido un error al eliminar el producto \n" +error)
  })
}

}


