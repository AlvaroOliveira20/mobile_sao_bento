import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacoesDeMatriculaPageRoutingModule } from './solicitacoes-de-matricula-routing.module';

import { SolicitacoesDeMatriculaPage } from './solicitacoes-de-matricula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacoesDeMatriculaPageRoutingModule
  ],
  declarations: [SolicitacoesDeMatriculaPage]
})
export class SolicitacoesDeMatriculaPageModule {}
