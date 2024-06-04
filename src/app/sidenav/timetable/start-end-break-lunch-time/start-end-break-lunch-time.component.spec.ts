import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEndBreakLunchTimeComponent } from './start-end-break-lunch-time.component';

describe('StartEndBreakLunchTimeComponent', () => {
  let component: StartEndBreakLunchTimeComponent;
  let fixture: ComponentFixture<StartEndBreakLunchTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartEndBreakLunchTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartEndBreakLunchTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
