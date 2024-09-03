import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  product: string = ''
//coleccion que va a recibir los productos que se  vayan agregando mediante el Output
  productosCarrusel : Producto[] = [] 

  productoAnadido(producto: Producto){ 
      this.product = `${producto.nombre} : $${producto.precio}`;
    
      try{
        
      /*Agregamos la informacion recibida por el parametro de la funcion 
      a la coleccion del carusel
      */
     this.productosCarrusel.push(producto)

     Swal.fire({
      title:"¡Enhorabuena!",
      text: "Ha añadido el producto con exito",
      icon: 'info'
     })
      }
      catch(error){
        Swal.fire({
          title:"¡Oh No!",
          text: "Ha ocurrido un error\n"+error,
          icon:'error'
         })
      }

      /*Agregamos la informacion recibida por el parametro de la funcion 
      a la coleccion del carusel
      */
     this.productosCarrusel.push(producto)

    
  }
}
