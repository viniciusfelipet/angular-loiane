import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DataFormComponent } from './data-form.component';

@NgModule({
    declarations: [DataFormComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        SharedModule,
        HttpClientModule
    ],
})
export class DataFormModule { }
