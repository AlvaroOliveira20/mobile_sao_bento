import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroDadosPage } from './cadastro-dados.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroDadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroDadosPageRoutingModule {}
