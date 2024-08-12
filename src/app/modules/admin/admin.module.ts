import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//archivo de rutas del modulo
import { AdminRoutingModule } from './admin-routing.module';
//vistas
import { AdminComponent } from './pages/admin/admin.component';
//componentes locales
import { TableComponent } from './components/table/table.component';
//paqueteria para formularios y formularios reactivos
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//componentes de material
import {MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AdminComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports:[
    AdminComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AdminModule { }
