import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorClassesComponent } from './professor-classes.component';

describe('ProfessorClassesComponent', () => {
  let component: ProfessorClassesComponent;
  let fixture: ComponentFixture<ProfessorClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
