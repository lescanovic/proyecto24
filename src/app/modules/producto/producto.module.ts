import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    ProductoComponent,
    LibrosComponent,
    IndumentariaComponent,
    AccesoriosComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
