import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerificationComponent } from './dialog-verification.component';

describe('DialogVerificationComponent', () => {
  let component: DialogVerificationComponent;
  let fixture: ComponentFixture<DialogVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
