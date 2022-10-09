import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarMatriculaPage } from './visualizar-matricula.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarMatriculaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarMatriculaPageRoutingModule {}
