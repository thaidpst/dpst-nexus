import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserHistoryComponent } from './page-user-history.component';

describe('PageUserHistoryComponent', () => {
  let component: PageUserHistoryComponent;
  let fixture: ComponentFixture<PageUserHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUserHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUserHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
