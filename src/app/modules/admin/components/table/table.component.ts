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
  coleccionProductos: Producto[] = [];
  //Definimos formulario para los productos 


  productosSeleccionado!: Producto; //! para que tome valores vacios
  modalVisibleProducto: boolean = false
  nombreImagen!: string //Obtiene el nombre de la imagen
  imagen!: string //Obtiene la ruta de la imagen


  //Atributos alfanumeros sin string se inicializan con comillas simples 
  //Atributos numericos se inicializan con 0
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    //imagen: new FormControl('',Validators.required), //Lo comento porque ya no sera requerido, la imagen no se subira con la direccion, sino que se subira una imagen descargada
    alt: new FormControl('', Validators.required),


  })

  constructor(public servicioCrud: CrudService) { }
  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto
    })
  }
  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        //no toma al id al principio porque la bd lo agrega solo
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: '', //La imagen generara su contenido desde la base de datos
        alt: this.producto.value.alt!,

      }
      //Enviamos nombre y url
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          //Encapsulamos respuesta y enviamos la informacion recibida
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              //Metodo crearProducto recibe datos del formulario y la URl creada
              this.servicioCrud.crearProducto(nuevoProducto, url)
                .then(producto => {
                  alert("Ha agregado un nuevo producto con exito!")
                  //Resetea el formulario y las casillas quedan vacias
                  this.producto.reset();
                })

                .catch(err => {
                  alert("Ha ocurrido un error al cargar el producto");
                });
            })
        })




    };
  }

  cargarImagen(event: any) {

    let archivo = event.target.files[0];
    let reader = new FileReader()
    if (archivo != undefined) {

      /*Llamamos a metodo readAsDataURL para leer toda la informacion recibida
        enviamos como parametro al archivo porque sera el cargador de tener la info ingresada por el usuario
  
      */
      reader.readAsDataURL(archivo)

      reader.onloadend = () => {
        let url = reader.result
        if (url != null) {
          this.nombreImagen = archivo.name
          this.imagen = url.toString()
        }
      }
    }

  }


  /*Eliminar*/
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;

    this.productosSeleccionado = productoSeleccionado
  }


  borrarProducto() {
    /*Ahora enviamos tanto el ID del producto (para identificarlo en firestore) y la URL de la imagen(para eliminarla
     desde el almacenamiento de storage).
    */
    this.servicioCrud.eliminarProducto(this.productosSeleccionado.idProducto, this.productosSeleccionado.imagen)
      .then(respuesta => {
        alert("Se ha podido eliminar con exito")
      })
      .catch(error => {
        alert("Ha ocurrido un error al eliminar el producto \n" + error)
      })
  }
  /* Editar producto*/
  mostrarEditar(productoSeleccionado: Producto) {
    this.productosSeleccionado = productoSeleccionado
    //Tomar los valores del producto seleccionado y los va a autocompletar en el formulario del modal (menos el ID)
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      //imagen:productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })
  }

  //Se vincula al boton "editarProducto" del modal "editar" en el html
  editarProducto() {
    let datos: Producto = {
      idProducto: this.productosSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.productosSeleccionado.imagen, //Llamamos del producto seleccionado
      alt: this.producto.value.alt!,
    }

    //Vamos a verificar si el usuario ingresa o no una nueva imagen
    if (this.imagen) {
      //Llamamos del servicio Crud al metodo Subir imagen
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp) 
            .then(url => {
              datos.imagen = url; //Actualizamos URL de la imagen en los datos del formulario

              this.actualizarProducto(datos); //Esta funcion envia los datos con cambios realizados

              this.producto.reset(); //Reseteamos para que queden las casillas vacias

            })
            .catch(error => {
              alert("Hubo un error al subir la imagen \n" + error)
              this.producto.reset();
            })
        })
    }
    else{
      /*Actualizamos el formulario con los datos recibidos del usuario pero sin modificar la imagen ya existente
        en firestore y en storage */
      this.actualizarProducto(datos);
    }

   
  }


  actualizarProducto(datos:Producto) //Recibe los datos
  {
     //Enviamos al metodo el id del producto seleccionado y los datos actualizados 
     this.servicioCrud.modificarProducto(this.productosSeleccionado.idProducto,datos)
     .then(producto => {
       alert("El producto se ha modificado con exito!")
     })
     .catch(error => {
       alert("Hubo un problema :c: \n" + error)

     })

  }
}
