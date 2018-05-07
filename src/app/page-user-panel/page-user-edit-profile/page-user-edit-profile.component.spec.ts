import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserEditProfileComponent } from './page-user-edit-profile.component';

describe('PageUserEditProfileComponent', () => {
  let component: PageUserEditProfileComponent;
  let fixture: ComponentFixture<PageUserEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUserEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUserEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
