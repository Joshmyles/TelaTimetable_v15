import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ValueSplitterPipe } from 'src/app/value-splitter.pipe';
import { ConvertHtmlToPdfDirective } from 'src/shared/convert-html-to-pdf.directive';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { SharedModule } from 'src/shared/shared.module';
import { TimetableExcelDirective } from 'src/shared/timetable-uploader.directive';
import { FilterSchoolDetailsComponent } from './filter-school-details/filter-school-details.component';
import { NewSystemTimetableComponent } from './new-system-timetable/new-system-timetable.component';
import { StartEndBreakLunchTimeComponent } from './start-end-break-lunch-time/start-end-break-lunch-time.component';
import { UploadTimetableComponent } from './upload-timetable/upload-timetable.component';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';

@NgModule({
  declarations: [
    ConvertHtmlToPdfDirective,
    TimetableExcelDirective,
    ValueSplitterPipe,
    ViewTimetableComponent,
    NewSystemTimetableComponent,
    UploadTimetableComponent,
    StartEndBreakLunchTimeComponent,
    FilterSchoolDetailsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgmaterialModule, SharedModule],
})
export class TimetableModule {}
