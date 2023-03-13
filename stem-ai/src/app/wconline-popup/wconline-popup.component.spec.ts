import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WconlinePopupComponent } from './wconline-popup.component';

describe('WconlinePopupComponent', () => {
  let component: WconlinePopupComponent;
  let fixture: ComponentFixture<WconlinePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WconlinePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WconlinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
