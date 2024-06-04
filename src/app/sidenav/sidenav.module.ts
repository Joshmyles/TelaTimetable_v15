import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { CalendarModule } from './calendar/calendar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterSchoolDetailsComponent } from './timetable/filter-school-details/filter-school-details.component';
import { NewSystemTimetableComponent } from './timetable/new-system-timetable/new-system-timetable.component';
import { StartEndBreakLunchTimeComponent } from './timetable/start-end-break-lunch-time/start-end-break-lunch-time.component';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { SidenavComponent } from './sidenav.component';
@NgModule({
  declarations: [
    FilterSchoolDetailsComponent,
    NewSystemTimetableComponent,
    StartEndBreakLunchTimeComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    NgmaterialModule,
    ReactiveFormsModule,
    SidenavRoutingModule,
    CalendarModule,
  ],
})
export class SidenavModule {}
