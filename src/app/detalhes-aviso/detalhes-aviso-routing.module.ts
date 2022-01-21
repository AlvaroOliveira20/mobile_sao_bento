import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesAvisoPage } from './detalhes-aviso.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesAvisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesAvisoPageRoutingModule {}
