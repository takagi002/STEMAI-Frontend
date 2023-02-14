import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecComponent } from './student-rec.component';

describe('StudentRecComponent', () => {
  let component: StudentRecComponent;
  let fixture: ComponentFixture<StudentRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRecComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
