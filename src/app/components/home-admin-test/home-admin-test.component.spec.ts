import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminTestComponent } from './home-admin-test.component';

describe('HomeAdminTestComponent', () => {
  let component: HomeAdminTestComponent;
  let fixture: ComponentFixture<HomeAdminTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdminTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdminTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
