import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdminStatisticComponent } from './page-admin-statistic.component';

describe('PageAdminStatisticComponent', () => {
  let component: PageAdminStatisticComponent;
  let fixture: ComponentFixture<PageAdminStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdminStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdminStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
