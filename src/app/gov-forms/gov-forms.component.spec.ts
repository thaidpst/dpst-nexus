import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovFormsComponent } from './gov-forms.component';

describe('GovFormsComponent', () => {
  let component: GovFormsComponent;
  let fixture: ComponentFixture<GovFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
