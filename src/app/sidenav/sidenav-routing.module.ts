import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { NewCalendarComponent } from './calendar/new-calendar/new-calendar.component';
import { PublicHolidaysComponent } from './calendar/public-holidays/public-holidays.component';
import { ViewCalendarComponent } from './calendar/view-calendar/view-calendar.component';
import { SidenavComponent } from './sidenav.component';
import { NewSystemTimetableComponent } from './timetable/new-system-timetable/new-system-timetable.component';
import { UploadTimetableComponent } from './timetable/upload-timetable/upload-timetable.component';
import { ViewTimetableComponent } from './timetable/view-timetable/view-timetable.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthenticationGuard],
    component: SidenavComponent,
    children: [
      { path: '', redirectTo: 'UploadTimetable', pathMatch: 'full' },
      // {path:"Timetable" , loadChildren:() => import("../timetable/timetable.module").then((m) => m.TimetableModule) , canActivate:[AuthenticationGuard]},

      { path: 'UploadTimetable', component: UploadTimetableComponent },
      { path: 'NewTimetable', component: NewSystemTimetableComponent },
      { path: 'ViewTimetable', component: ViewTimetableComponent },

      { path: 'NewCalendar', component: NewCalendarComponent },
      { path: 'ViewCalendar', component: ViewCalendarComponent },
      { path: 'PublicHolidays', component: PublicHolidaysComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidenavRoutingModule {}
