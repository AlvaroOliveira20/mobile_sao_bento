import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaskPipe } from 'ngx-mask';
import { IonicModule } from '@ionic/angular';

import { EditarAvisoPageRoutingModule } from './editar-aviso-routing.module';

import { EditarAvisoPage } from './editar-aviso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAvisoPageRoutingModule
  ],
  providers: [
    MaskPipe
  ],
  declarations: [EditarAvisoPage]
})
export class EditarAvisoPageModule {}
