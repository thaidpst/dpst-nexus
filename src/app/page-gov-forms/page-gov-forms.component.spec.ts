import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGovFormsComponent } from './page-gov-forms.component';

describe('PageGovFormsComponent', () => {
  let component: PageGovFormsComponent;
  let fixture: ComponentFixture<PageGovFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGovFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGovFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
