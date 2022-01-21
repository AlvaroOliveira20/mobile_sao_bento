import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicaoDoCardapioPage } from './edicao-do-cardapio.page';

const routes: Routes = [
  {
    path: '',
    component: EdicaoDoCardapioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicaoDoCardapioPageRoutingModule {}
