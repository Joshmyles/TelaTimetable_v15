import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditPublicHolidayComponent } from './new-edit-public-holiday.component';

describe('NewEditPublicHolidayComponent', () => {
  let component: NewEditPublicHolidayComponent;
  let fixture: ComponentFixture<NewEditPublicHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditPublicHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditPublicHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
