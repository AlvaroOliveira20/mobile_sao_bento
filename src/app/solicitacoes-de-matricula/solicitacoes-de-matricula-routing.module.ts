import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacoesDeMatriculaPage } from './solicitacoes-de-matricula.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacoesDeMatriculaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacoesDeMatriculaPageRoutingModule {}
