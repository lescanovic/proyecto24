import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Vistas del modulo producto
import { ProductoComponent } from './pages/producto/producto.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
//rutas para las vistas
const routes: Routes = [
  {path:"producto",component: ProductoComponent},
  {path:"libros",component:LibrosComponent},
  {path:"indumentaria",component:IndumentariaComponent},
  {path:"accesorios",component:AccesoriosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
