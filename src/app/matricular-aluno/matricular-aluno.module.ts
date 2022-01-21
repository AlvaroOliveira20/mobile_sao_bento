import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatricularAlunoPageRoutingModule } from './matricular-aluno-routing.module';

import { MatricularAlunoPage } from './matricular-aluno.page';
import { MaskPipe } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatricularAlunoPageRoutingModule
  ],
  providers: [
    MaskPipe
  ],
  declarations: [MatricularAlunoPage]
})
export class MatricularAlunoPageModule {}
