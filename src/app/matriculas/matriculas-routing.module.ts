import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatriculasPage } from './matriculas.page';

const routes: Routes = [
  {
    path: '',
    component: MatriculasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatriculasPageRoutingModule {}
