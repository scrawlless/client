import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldRoutingModule } from './field-routing.module';
import { FieldComponent } from './field.component';

import { SharedModule } from '../../../_modules/shared/shared.module';

@NgModule({
  declarations: [FieldComponent],
  imports: [
    CommonModule,
    FieldRoutingModule,
    SharedModule
  ]
})
export class FieldModule { }
