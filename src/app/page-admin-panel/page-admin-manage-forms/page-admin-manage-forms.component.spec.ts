import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdminManageFormsComponent } from './page-admin-manage-forms.component';

describe('PageAdminManageFormsComponent', () => {
  let component: PageAdminManageFormsComponent;
  let fixture: ComponentFixture<PageAdminManageFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdminManageFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdminManageFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
