import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckcoutComponent } from './checkcout.component';

describe('CheckcoutComponent', () => {
  let component: CheckcoutComponent;
  let fixture: ComponentFixture<CheckcoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckcoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckcoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
