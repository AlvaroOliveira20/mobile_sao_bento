import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';

import { EdicaoDoCardapioPageRoutingModule } from './edicao-do-cardapio-routing.module';

import { EdicaoDoCardapioPage } from './edicao-do-cardapio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicaoDoCardapioPageRoutingModule,
    PipesModule,
  ],
  declarations: [EdicaoDoCardapioPage]
})
export class EdicaoDoCardapioPageModule {}
