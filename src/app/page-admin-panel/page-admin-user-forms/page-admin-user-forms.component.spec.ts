import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdminUserFormsComponent } from './page-admin-user-forms.component';

describe('PageAdminUserFormsComponent', () => {
  let component: PageAdminUserFormsComponent;
  let fixture: ComponentFixture<PageAdminUserFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdminUserFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdminUserFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
