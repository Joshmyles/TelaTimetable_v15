import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolFilterComponent } from './school-filter.component';

describe('SchoolFilterComponent', () => {
  let component: SchoolFilterComponent;
  let fixture: ComponentFixture<SchoolFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
