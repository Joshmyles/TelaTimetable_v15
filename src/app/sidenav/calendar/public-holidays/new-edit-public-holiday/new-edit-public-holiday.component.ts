import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/shared/confirm/confirm.component';
import { PublicHoliday } from '../../calendar.dto';
import { CalendarService } from '../../calendar.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-edit-public-holiday',
  templateUrl: './new-edit-public-holiday.component.html',
  styleUrls: ['./new-edit-public-holiday.component.scss'],
})
export class NewEditPublicHolidayComponent implements OnInit {
  public fb: FormBuilder = inject(FormBuilder);
  public calendarService: CalendarService = inject(CalendarService);
  public toastrService: ToastrService = inject(ToastrService);
  public dialog: MatDialog = inject(MatDialog);
  public data: PublicHoliday | null = inject(MAT_DIALOG_DATA);
  public dialogRef: MatDialogRef<NewEditPublicHolidayComponent> =
    inject(MatDialogRef);

  isEdit$ = new BehaviorSubject<boolean>(this.data != null);
  loading$ = new BehaviorSubject<boolean>(false);

  formGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    description: ['', Validators.required],
  });

  control(key: string) {
    return this.formGroup.controls[key];
  }

  ngOnInit(): void {
    if (this.isEdit$) {
      this.formGroup.patchValue({
        name: this.data?.name,
        date: this.data?.date,
        description: this.data?.description,
      });
    }
  }

  submit() {
    if (this.isEdit$) {
      const holiday: Partial<PublicHoliday> = {
        ...this.data,
        name: this.control('name').value,
        description: this.control('description').value,
        date: this.control('date').value,
      };
      this.edit(holiday);
    } else {
      const holiday: Partial<PublicHoliday> = {
        name: this.control('name').value,
        description: this.control('description').value,
        date: this.control('date').value,
      };
      this.add(holiday);
    }
  }

  add(holiday: Partial<PublicHoliday>) {
    this.dialog
      .open(ConfirmComponent, {
        disableClose: true,
        data: 'Are you sure to add this holiday?',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.calendarService.addPublicHoliday(holiday as PublicHoliday);
          this.toastrService.success('deleted');
          this.dialogRef.close(true);
        }
      });
  }

  edit(holiday: Partial<PublicHoliday>) {
    this.dialogRef.close(true);
  }
}
