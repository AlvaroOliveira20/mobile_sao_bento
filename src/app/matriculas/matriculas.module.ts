import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatriculasPageRoutingModule } from './matriculas-routing.module';

import { MatriculasPage } from './matriculas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatriculasPageRoutingModule
  ],
  declarations: [MatriculasPage]
})
export class MatriculasPageModule {}
