import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdminEmailBlastComponent } from './page-admin-email-blast.component';

describe('PageAdminEmailBlastComponent', () => {
  let component: PageAdminEmailBlastComponent;
  let fixture: ComponentFixture<PageAdminEmailBlastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAdminEmailBlastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdminEmailBlastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
