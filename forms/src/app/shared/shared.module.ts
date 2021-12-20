import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownService } from './services/dropdown.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [CampoControlErroComponent, FormDebugComponent],
  exports: [CampoControlErroComponent, FormDebugComponent],
  providers: [DropdownService]
})
export class SharedModule { }
