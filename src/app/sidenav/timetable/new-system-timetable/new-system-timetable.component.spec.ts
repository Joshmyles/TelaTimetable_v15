import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSystemTimetableComponent } from './new-system-timetable.component';

describe('NewSystemTimetableComponent', () => {
  let component: NewSystemTimetableComponent;
  let fixture: ComponentFixture<NewSystemTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSystemTimetableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSystemTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
