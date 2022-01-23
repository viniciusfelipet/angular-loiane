import { DropdownService } from './services/dropdown.service';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


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
