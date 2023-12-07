import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationComponent } from './resignation.component';

describe('ResignationComponent', () => {
  let component: ResignationComponent;
  let fixture: ComponentFixture<ResignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
