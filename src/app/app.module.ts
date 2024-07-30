import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importamos componentes globales
import { SharedModule } from './modules/shared/shared.module';

import{environment} from 'src/environments/environments' //vincula a la bd con la app
import{AngularFireModule} from '@angular/fire/compat' //trabaja con las colecciones de informacion
import{AngularFireAuthModule} from '@angular/fire/compat/auth' //trabaja con la autentificacion
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { TableComponent } from './modules/admin/components/table/table.component' //trabaja con imagenes y archivos
@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
     
      
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule
       
    ],
})
export class AppModule { }
