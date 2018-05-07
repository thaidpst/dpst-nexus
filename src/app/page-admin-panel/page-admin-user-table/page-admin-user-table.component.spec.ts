import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdminUserTableComponent } from './page-admin-user-table.component';

describe('PageAdminUserTableComponent', () => {
  let component: PageAdminUserTableComponent;
  let fixture: ComponentFixture<PageAdminUserTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdminUserTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdminUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
