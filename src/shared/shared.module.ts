import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { SchoolFilterComponent } from './school-filter/school-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgmaterialModule } from './ngmaterial.module';

@NgModule({
  declarations: [ConfirmComponent, SchoolFilterComponent],
  imports: [CommonModule, NgmaterialModule, ReactiveFormsModule],
  exports: [SchoolFilterComponent],
})
export class SharedModule {}
