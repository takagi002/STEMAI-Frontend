import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedUserPageComponent } from './unauthenticated-user-page.component';

describe('UnauthenticatedUserPageComponent', () => {
  let component: UnauthenticatedUserPageComponent;
  let fixture: ComponentFixture<UnauthenticatedUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedUserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthenticatedUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
