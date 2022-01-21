import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarAvisosPage } from './visualizar-avisos.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarAvisosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarAvisosPageRoutingModule {}
