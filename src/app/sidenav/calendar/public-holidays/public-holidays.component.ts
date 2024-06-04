import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/shared/confirm/confirm.component';
import { PublicHoliday } from '../calendar.dto';
import { CalendarService } from '../calendar.service';
import { NewEditPublicHolidayComponent } from './new-edit-public-holiday/new-edit-public-holiday.component';
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-public-holidays',
  templateUrl: './public-holidays.component.html',
  styleUrls: ['./public-holidays.component.scss'],
})
export class PublicHolidaysComponent implements OnInit, AfterViewInit {
  public calendarService: CalendarService = inject(CalendarService);
  public toastrService: ToastrService = inject(ToastrService);

  displayedColumns = ['position', 'name', 'date', 'description', 'action'];
  dataSource = new MatTableDataSource<PublicHoliday>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dialog: MatDialog = inject(MatDialog);

  holidays$ = new BehaviorSubject<PublicHoliday[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.getHolidays();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event: any) {
    event = <CdkDragDrop<string[]>>event;
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  add() {
    this.dialog.open(NewEditPublicHolidayComponent, {
      disableClose: true,
      data: null,
      height: '50%',
      width: '40%',
    });
  }

  edit(holiday: PublicHoliday) {
    this.dialog.open(NewEditPublicHolidayComponent, {
      disableClose: true,
      data: holiday,
      height: '50%',
      width: '40%',
    });
  }

  delete(holiday: PublicHoliday) {
    this.dialog
      .open(ConfirmComponent, {
        disableClose: true,
        data: holiday,
        height: '50%',
        width: '40%',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.calendarService.deletePublicHoliday(holiday.name);
          this.toastrService.success('deleted');
        }
      });
  }

  getHolidays() {
    this.loading$.next(true);
    this.calendarService.getPublicHolidays().subscribe((holidays) => {
      this.dataSource.data = holidays;
      this.holidays$.next(holidays);
      this.loading$.next(false);
    });
  }
}
