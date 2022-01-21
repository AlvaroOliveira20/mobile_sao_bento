import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicaoDeAvisosPageRoutingModule } from './edicao-de-avisos-routing.module';

import { EdicaoDeAvisosPage } from './edicao-de-avisos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicaoDeAvisosPageRoutingModule
  ],
  declarations: [EdicaoDeAvisosPage]
})
export class EdicaoDeAvisosPageModule {}
