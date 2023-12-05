import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesByDepartementComponent } from './files-by-departement.component';

describe('FilesByDepartementComponent', () => {
  let component: FilesByDepartementComponent;
  let fixture: ComponentFixture<FilesByDepartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesByDepartementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesByDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
