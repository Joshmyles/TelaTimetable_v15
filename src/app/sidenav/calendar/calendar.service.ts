import { Injectable } from '@angular/core';
import { LocalDate, Month } from '@js-joda/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PublicHoliday } from './calendar.dto';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private HOLIDAYS: PublicHoliday[] = [
    {
      name: "New Year's Day",
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.JANUARY)
        .withDayOfMonth(1),
    },
    {
      name: 'Liberation Day',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.JANUARY)
        .withDayOfMonth(26),
    },
    {
      name: 'Archbishop Janani Luwum Day',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.FEBRUARY)
        .withDayOfMonth(16),
    },
    {
      name: "International Women's Day",
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.MARCH)
        .withDayOfMonth(8),
    },
    {
      name: 'Good Friday',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.MARCH)
        .withDayOfMonth(29),
    },
    {
      name: 'Easter Sunday',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.MARCH)
        .withDayOfMonth(31),
    },
    {
      name: 'Easter Monday',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.APRIL)
        .withDayOfMonth(1),
    },
    {
      name: 'Idd EL Fitri',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.APRIL)
        .withDayOfMonth(10),
    },
    {
      name: 'Labour Day',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.MAY)
        .withDayOfMonth(1),
    },
    {
      name: "Uganda Martyr's Day",
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.JUNE)
        .withDayOfMonth(3),
    },
    {
      name: "National Heroe's Day",
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.JUNE)
        .withDayOfMonth(9),
    },
    {
      name: 'Idd Al Adhua',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.JUNE)
        .withDayOfMonth(17),
    },
    {
      name: 'Independence Day',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.OCTOBER)
        .withDayOfMonth(9),
    },
    {
      name: 'Christmas Day',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.DECEMBER)
        .withDayOfMonth(25),
    },
    {
      name: 'Boxing Day',
      description: '',
      date: LocalDate.now()
        .withYear(2023)
        .withMonth(Month.DECEMBER)
        .withDayOfMonth(26),
    },
  ];
  holidays$ = new BehaviorSubject<PublicHoliday[]>([...this.HOLIDAYS]);

  constructor() {}

  addPublicHoliday(holidays: PublicHoliday) {
    this.HOLIDAYS.push(holidays);
    this.holidays$.next(this.HOLIDAYS);
  }

  getPublicHolidays(): Observable<PublicHoliday[]> {
    return this.holidays$;
  }

  deletePublicHoliday(name: string): void {
    const index = this.HOLIDAYS.findIndex((h) => h.name === name);
    this.HOLIDAYS.splice(index, 1);
    this.holidays$.next(this.HOLIDAYS);
  }
}
