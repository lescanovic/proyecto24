import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Vistas- Paginas
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './secciones/inicio/inicio.component';
//Componente Local
import { CardComponent } from './components/card/card.component';

//Componentes de material 
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    InicioComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class InicioModule { }
