import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrivilageSettingFormComponent } from './admin-privilage-setting-form.component';

describe('AdminPrivilageSettingFormComponent', () => {
  let component: AdminPrivilageSettingFormComponent;
  let fixture: ComponentFixture<AdminPrivilageSettingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPrivilageSettingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrivilageSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
