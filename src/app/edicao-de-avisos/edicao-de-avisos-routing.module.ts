import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicaoDeAvisosPage } from './edicao-de-avisos.page';

const routes: Routes = [
  {
    path: '',
    component: EdicaoDeAvisosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicaoDeAvisosPageRoutingModule {}
