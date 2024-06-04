import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarFilterComponent } from './calendar-filter/calendar-filter.component';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';
import { PublicHolidaysComponent } from './public-holidays/public-holidays.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';
import { NewEditPublicHolidayComponent } from './public-holidays/new-edit-public-holiday/new-edit-public-holiday.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    CalendarFilterComponent,
    NewCalendarComponent,
    PublicHolidaysComponent,
    ViewCalendarComponent,
    NewEditPublicHolidayComponent,
  ],
  imports: [CommonModule, SharedModule, NgmaterialModule, ReactiveFormsModule],
})
export class CalendarModule {}
