import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersNeededComponent } from './numbers-needed.component';

describe('NumbersNeededComponent', () => {
  let component: NumbersNeededComponent;
  let fixture: ComponentFixture<NumbersNeededComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbersNeededComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersNeededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
