import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DayOfWeek, LocalTime } from '@js-joda/core';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  BehaviorSubject,
  startWith,
  map,
  of,
  Subscription,
} from 'rxjs';
import { TelaTimetablePattern } from 'src/shared/TelaDateTimePattern';
import { FilteredSchoolDetails } from 'src/shared/school-filter/school-filter.component';
import {
  SchoolStaffWithSchool_DistrictDto,
  SchoolFilterService,
} from 'src/shared/school-filter/school-filter.service';
import { ClassStartEndBreakLunchTime } from '../start-end-break-lunch-time/start-end-break-lunch-time.component';
import {
  TimeRange,
  NewDbTimetable,
  DbTimetableSubject,
  DbTimetableClass,
  NewDbTimetableLesson,
  DbTimetableStaff,
} from '../timetable.dto';

@Component({
  selector: 'app-new-system-timetable',
  templateUrl: './new-system-timetable.component.html',
  styleUrls: ['./new-system-timetable.component.scss'],
})
export class NewSystemTimetableComponent implements OnInit {
  filteredSchoolDetails!: FilteredSchoolDetails;
  DayOfWeek = DayOfWeek;
  classStartEndBreakLunchTime!: ClassStartEndBreakLunchTime;
  isStartEndBreakLunchTimeInValid: boolean = true;
  isSaving: boolean = false;

  startEndTimeRanges: TimeRange[] = [];
  selectedLunchTimes: TimeRange[] = [];

  newTimetable: NewDbTimetable = {
    school: { id: '' },
    academicTerm: { id: '' },
    lessons: [],
  };

  subjectControl = new FormControl<string | DbTimetableSubject>('');
  filteredSubjectOptions$: Observable<DbTimetableSubject[]> =
    new BehaviorSubject([]);

  staffControl = new FormControl<string | SchoolStaffWithSchool_DistrictDto>(
    ''
  );
  filteredStaffOptions$: Observable<SchoolStaffWithSchool_DistrictDto[]> =
    new BehaviorSubject([]);

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private schoolFilterService: SchoolFilterService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filteredStaffOptions$ = this.staffControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        // instance of user is selected refill the filter
        if (value && typeof value === 'object') {
          return this.filteredSchoolDetails?.staffList || [];
        } else {
          const filterValue = value?.toLowerCase() || '';
          return (
            this.filteredSchoolDetails?.staffList.filter(
              (staff) =>
                staff.firstName
                  .toLowerCase()
                  .includes(filterValue.toLowerCase()) ||
                staff.lastName.toLowerCase().includes(filterValue.toLowerCase())
            ) || []
          );
        }
      })
    );

    this.filteredSubjectOptions$ = this.subjectControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        // instance of user is selected refill the filter
        if (value && typeof value === 'object') {
          return this.filteredSchoolDetails?.subjects || [];
        } else {
          const filterValue = value?.toLowerCase() || '';
          return (this.filteredSchoolDetails?.subjects || []).filter((option) =>
            option.name.toLowerCase().includes(filterValue.toLocaleLowerCase())
          );
        }
      })
    );
  }

  selectedTabChange(_event: MatTabChangeEvent) {
    this.newTimetable.lessons = [];
    this.staffControl.patchValue(null);
    this.subjectControl.patchValue(null);
  }

  generateTimetable() {
    this.newTimetable.lessons = [];
    this.subjectControl.patchValue(null);
    this.staffControl.patchValue(null);
    this.startEndTimeRanges = this.generateTimetablePeriods2(
      this.classStartEndBreakLunchTime
    );
  }

  isBreakLunchTime(
    timeRange: TimeRange,
    csebt: ClassStartEndBreakLunchTime
  ): boolean {
    const breakRange: TimeRange = {
      startTime: LocalTime.parse(csebt.breakStartTime, TelaTimetablePattern),
      endTime: LocalTime.parse(csebt.breakEndTime, TelaTimetablePattern),
    };
    const lunchRange: TimeRange = {
      startTime: LocalTime.parse(csebt.lunchStartTime, TelaTimetablePattern),
      endTime: LocalTime.parse(csebt.lunchEndTime, TelaTimetablePattern),
    };
    return [breakRange, lunchRange].includes(timeRange);
  }

  generateTimetablePeriods2(CSEBLT: ClassStartEndBreakLunchTime) {
    let beforeBreak: TimeRange[] = [];
    let afterBreakBeforeLunch: TimeRange[] = [];
    let afterLunchBeforeEndOfDay: TimeRange[] = [];

    // if startTime is equal to breakTIME , offset current to next break time

    // AFTER DAY START BEFORE BREAK

    let beforeBreakStartTimeString: string = CSEBLT.classStartTime; // startTime.format(TelaTimetablePattern)
    while (
      LocalTime.parse(
        beforeBreakStartTimeString,
        TelaTimetablePattern
      ).isBefore(LocalTime.parse(CSEBLT.breakStartTime, TelaTimetablePattern))
    ) {
      let timerange: TimeRange = {
        startTime: LocalTime.parse(
          beforeBreakStartTimeString,
          TelaTimetablePattern
        ),
        endTime: LocalTime.now(),
      }; // set start time
      beforeBreakStartTimeString = LocalTime.parse(
        beforeBreakStartTimeString,
        TelaTimetablePattern
      )
        .plusMinutes(CSEBLT.duration)
        .format(TelaTimetablePattern); //end time
      timerange.endTime = LocalTime.parse(
        beforeBreakStartTimeString,
        TelaTimetablePattern
      ); // set end time
      beforeBreak.push(timerange);
    }
    // console.log('beforeBreak ' , beforeBreak)

    /// After BREAK BEFORE LUNCH
    let afterBreakBeforeLunchTimeString: string = CSEBLT.breakEndTime; // startTime.format(TelaTimetablePattern)
    while (
      LocalTime.parse(
        afterBreakBeforeLunchTimeString,
        TelaTimetablePattern
      ).isBefore(LocalTime.parse(CSEBLT.lunchStartTime, TelaTimetablePattern))
    ) {
      let timerange: TimeRange = {
        startTime: LocalTime.parse(
          afterBreakBeforeLunchTimeString,
          TelaTimetablePattern
        ),
        endTime: LocalTime.now(),
      }; // set start time
      afterBreakBeforeLunchTimeString = LocalTime.parse(
        afterBreakBeforeLunchTimeString,
        TelaTimetablePattern
      )
        .plusMinutes(CSEBLT.duration)
        .format(TelaTimetablePattern); //end time
      timerange.endTime = LocalTime.parse(
        afterBreakBeforeLunchTimeString,
        TelaTimetablePattern
      ); // set end time
      afterBreakBeforeLunch.push(timerange);
    }
    // console.log('afterBreakBeforeLunch ' , afterBreakBeforeLunch)

    /// After LUNCH BEFORE END OF DAY
    let afterLunchBeforeEndOfDayTimeString: string = CSEBLT.lunchEndTime; // startTime.format(TelaTimetablePattern)
    while (
      LocalTime.parse(
        afterLunchBeforeEndOfDayTimeString,
        TelaTimetablePattern
      ).isBefore(LocalTime.parse(CSEBLT.classEndTime, TelaTimetablePattern))
    ) {
      let timerange: TimeRange = {
        startTime: LocalTime.parse(
          afterLunchBeforeEndOfDayTimeString,
          TelaTimetablePattern
        ),
        endTime: LocalTime.now(),
      }; // set start time
      afterLunchBeforeEndOfDayTimeString = LocalTime.parse(
        afterLunchBeforeEndOfDayTimeString,
        TelaTimetablePattern
      )
        .plusMinutes(CSEBLT.duration)
        .format(TelaTimetablePattern); //end time
      timerange.endTime = LocalTime.parse(
        afterLunchBeforeEndOfDayTimeString,
        TelaTimetablePattern
      ); // set end time
      afterLunchBeforeEndOfDay.push(timerange);
    }
    // console.log('afterLunchBeforeEndOfDay ' , afterLunchBeforeEndOfDay)

    return [
      ...beforeBreak,
      ...afterBreakBeforeLunch,
      ...afterLunchBeforeEndOfDay,
    ];
  }

  onStaffChange2(
    event: MatAutocompleteSelectedEvent,
    startEndTimeRange: TimeRange,
    dayOfWeek: DayOfWeek,
    schoolClass: DbTimetableClass
  ) {
    const startTimeStr =
      startEndTimeRange.startTime.format(TelaTimetablePattern);
    let lesson: NewDbTimetableLesson | undefined =
      this.newTimetable.lessons.find(
        (nl) =>
          nl.startTime == startTimeStr &&
          nl.schoolClass?.id == schoolClass.id &&
          nl.lessonDay?.toLocaleLowerCase() ==
            dayOfWeek.name().toLocaleLowerCase()
      );
    const staff: DbTimetableStaff = event.option.value;

    if (lesson) {
      // update
      lesson.schoolStaff = staff;
    } else {
      // create
      lesson = {
        id: null,
        startTime: startTimeStr,
        endTime: startEndTimeRange.endTime.format(TelaTimetablePattern),
        lessonDay: dayOfWeek.name(),
        schoolClass: schoolClass,
        subject: null,
        schoolStaff: staff,
        duration: this.classStartEndBreakLunchTime.duration,
        breakStartTime: this.classStartEndBreakLunchTime.breakStartTime,
        breakEndTime: this.classStartEndBreakLunchTime.breakEndTime,
        lunchStartTime: this.classStartEndBreakLunchTime.lunchStartTime,
        lunchEndTime: this.classStartEndBreakLunchTime.lunchEndTime,
        classStartTime: this.classStartEndBreakLunchTime.classStartTime,
        classEndTime: this.classStartEndBreakLunchTime.classEndTime,
      };
      // this.newTimetable.lessons.push(lesson)
      this.newTimetable.lessons = [...this.newTimetable.lessons, lesson].sort(
        (a: NewDbTimetableLesson, b: NewDbTimetableLesson) => {
          if (a.startTime < b.startTime) {
            return -1;
          } else if (a.startTime > b.startTime) {
            return 1;
          } else {
            return 0;
          }
        }
      );
    }

    // console.log('timetable ' , this.newTimetable.lessons)
  }

  getLesson(
    startEndTimeRange: TimeRange,
    dayOfWeek: DayOfWeek,
    schoolClass: DbTimetableClass
  ): NewDbTimetableLesson | undefined {
    const startTimeStr =
      startEndTimeRange.startTime.format(TelaTimetablePattern);
    return this.newTimetable.lessons.find(
      (nl) =>
        nl.startTime == startTimeStr &&
        nl.schoolClass?.id == schoolClass.id &&
        nl.lessonDay?.toLocaleLowerCase() ==
          dayOfWeek.name().toLocaleLowerCase()
    );
  }

  showAllSubjects() {
    this.filteredSubjectOptions$ = of(
      this.filteredSchoolDetails?.subjects || []
    );
  }

  onSubjectChange2(
    $event: MatAutocompleteSelectedEvent,
    startEndTimeRange: TimeRange,
    dayOfWeek: DayOfWeek,
    schoolClass: DbTimetableClass
  ) {
    const startTimeStr =
      startEndTimeRange.startTime.format(TelaTimetablePattern);
    let lesson: NewDbTimetableLesson | undefined =
      this.newTimetable.lessons.find(
        (nl) =>
          nl.startTime == startTimeStr &&
          nl.schoolClass?.id == schoolClass.id &&
          nl.lessonDay?.toLocaleLowerCase() ==
            dayOfWeek.name().toLocaleLowerCase()
      );

    const subject: DbTimetableSubject = $event.option.value;

    if (lesson) {
      // update
      lesson.subject = subject;
    } else {
      // create
      lesson = {
        id: null,
        startTime: startTimeStr,
        endTime: startEndTimeRange.endTime.format(TelaTimetablePattern),
        lessonDay: dayOfWeek.name(),
        schoolClass: schoolClass,
        subject: subject,
        schoolStaff: null,
        duration: this.classStartEndBreakLunchTime.duration,
        breakStartTime: this.classStartEndBreakLunchTime.breakStartTime,
        breakEndTime: this.classStartEndBreakLunchTime.breakEndTime,
        lunchStartTime: this.classStartEndBreakLunchTime.lunchStartTime,
        lunchEndTime: this.classStartEndBreakLunchTime.lunchEndTime,
        classStartTime: this.classStartEndBreakLunchTime.classStartTime,
        classEndTime: this.classStartEndBreakLunchTime.classEndTime,
      };
      // this.newTimetable.lessons.push(lesson)
      this.newTimetable.lessons = [...this.newTimetable.lessons, lesson].sort(
        (a: NewDbTimetableLesson, b: NewDbTimetableLesson) => {
          if (a.startTime < b.startTime) {
            return -1;
          } else if (a.startTime > b.startTime) {
            return 1;
          } else {
            return 0;
          }
        }
      );
    }

    // console.log('timetable ' , this.newTimetable.lessons)
  }

  saveUpdateClassTimetable() {
    // this.newTimetable.lessons = TEST_LESSONS
    // console.log('this.newTimetable ', this.newTimetable)

    const someInvalid = this.newTimetable.lessons.filter(
      (lesson) => lesson.schoolStaff == null || lesson.subject == null
    );

    // console.log('someInvalid: ', someInvalid)
    if (
      someInvalid.length > 0 ||
      this.newTimetable.lessons.length == 0 ||
      this.newTimetable.lessons.length < this.startEndTimeRanges.length * 5
    ) {
      this.toastr.warning(`Timetable invalid lessons on
       ${someInvalid.map(
         (l) => `${l.lessonDay} @ ${l.startTime} - ${l.endTime}`
       )}\
       Reselect to fix
      `);
    } else {
      if (confirm(`Are you sure you want to save this class timetable`)) {
        // upload to server
        // console.log('No ')
        // console.log('reday newTimetable ', this.newTimetable)

        this.newTimetable.academicTerm = {
          id: this.filteredSchoolDetails?.term?.id as string,
        };
        this.newTimetable.school = {
          id: this.filteredSchoolDetails?.school?.id as string,
        };

        // console.log("IS ready to upload ", this.newTimetable)
        // update class details

        this.isSaving = true;
        const _$: Subscription = this.schoolFilterService
          .saveUpdateClassTimetable(this.newTimetable)
          .subscribe({
            next: (response) => {
              this.isSaving = false;
              this.toastr.success(response.data);
            },
            error: (error) => {
              this.isSaving = false;
              console.log(error);
            },
            complete: () => _$.unsubscribe(),
          });
      }
    }
  }

  displayStaffName(staff: SchoolStaffWithSchool_DistrictDto): string {
    return staff && staff.firstName && staff.lastName
      ? `${staff.firstName} ${staff.lastName}`
      : '';
  }

  displaySubjectCode(sub: DbTimetableSubject): string {
    return sub && sub.code ? sub.code : '';
  }
}
