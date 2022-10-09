import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarMatriculaPageRoutingModule } from './visualizar-matricula-routing.module';

import { VisualizarMatriculaPage } from './visualizar-matricula.page';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';

import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    VisualizarMatriculaPageRoutingModule
  ],
 providers: [
  HTTP, File 
 ],
  
  declarations: [VisualizarMatriculaPage]
})
export class VisualizarMatriculaPageModule {}
