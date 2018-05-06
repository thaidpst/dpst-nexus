import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCheckStatusComponent } from './page-check-status.component';

describe('PageCheckStatusComponent', () => {
  let component: PageCheckStatusComponent;
  let fixture: ComponentFixture<PageCheckStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCheckStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCheckStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
