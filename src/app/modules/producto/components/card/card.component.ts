import { Component } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
//IMPORTAMOS INTERFAZ
import { CrudService } from 'src/app/modules/admin/service/crud.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {


  coleccionProducto: Producto [] = []
 
  productoSeleccionado!: Producto ;

  modalVisible : boolean = false

  compraVisible: boolean = false
//directiva para comunicarse con el componente padre
  @Input() productoReciente: string = '';

  @Output() productoAgregado = new EventEmitter <Producto>()

constructor(public servicioCrud:CrudService){}

  ngOnInit() : void{
this.servicioCrud.obtenerProducto().subscribe(producto=>{
    this.coleccionProducto = producto
})
  }

mostrarVer(info: Producto){
  //cambio el estado del mdal
this.modalVisible = true 

this.productoSeleccionado = info

}

agregarProducto(info:Producto){
  this.productoAgregado.emit(info)
}

 //enviando la informacion del producto que agregamos



}


