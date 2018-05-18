import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovForm1Component } from './gov-form1.component';

describe('GovForm1Component', () => {
  let component: GovForm1Component;
  let fixture: ComponentFixture<GovForm1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovForm1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
