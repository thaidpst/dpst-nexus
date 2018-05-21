import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGovFormComponent } from './create-gov-form.component';

describe('CreateGovFormComponent', () => {
  let component: CreateGovFormComponent;
  let fixture: ComponentFixture<CreateGovFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGovFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGovFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
