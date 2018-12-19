import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLecturerComponent } from './manage-lecturer.component';

describe('ManageLecturerComponent', () => {
  let component: ManageLecturerComponent;
  let fixture: ComponentFixture<ManageLecturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLecturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
