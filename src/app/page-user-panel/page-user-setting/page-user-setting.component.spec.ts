import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserSettingComponent } from './page-user-setting.component';

describe('PageUserSettingComponent', () => {
  let component: PageUserSettingComponent;
  let fixture: ComponentFixture<PageUserSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUserSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
