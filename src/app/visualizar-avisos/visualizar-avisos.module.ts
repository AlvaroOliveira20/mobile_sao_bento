import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarAvisosPageRoutingModule } from './visualizar-avisos-routing.module';

import { VisualizarAvisosPage } from './visualizar-avisos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarAvisosPageRoutingModule
  ],
  declarations: [VisualizarAvisosPage]
})
export class VisualizarAvisosPageModule {}
