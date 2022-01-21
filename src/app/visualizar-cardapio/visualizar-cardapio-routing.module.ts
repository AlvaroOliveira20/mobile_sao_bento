import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarCardapioPage } from './visualizar-cardapio.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarCardapioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarCardapioPageRoutingModule {}
