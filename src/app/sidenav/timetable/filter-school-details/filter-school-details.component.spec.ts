import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSchoolDetailsComponent } from './filter-school-details.component';

describe('FilterSchoolDetailsComponent', () => {
  let component: FilterSchoolDetailsComponent;
  let fixture: ComponentFixture<FilterSchoolDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSchoolDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSchoolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
