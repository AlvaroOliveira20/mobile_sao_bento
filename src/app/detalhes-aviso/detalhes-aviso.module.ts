import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { DetalhesAvisoPageRoutingModule } from './detalhes-aviso-routing.module';

import { DetalhesAvisoPage } from './detalhes-aviso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesAvisoPageRoutingModule
  ],
  declarations: [DetalhesAvisoPage, SafeHtmlPipe]
})
export class DetalhesAvisoPageModule {}
