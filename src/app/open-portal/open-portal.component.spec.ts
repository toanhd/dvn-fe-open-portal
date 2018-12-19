import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPortalComponent } from './open-portal.component';

describe('OpenPortalComponent', () => {
  let component: OpenPortalComponent;
  let fixture: ComponentFixture<OpenPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
