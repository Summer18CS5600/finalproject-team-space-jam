import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PidComponent } from './pid.component';

describe('PidComponent', () => {
  let component: PidComponent;
  let fixture: ComponentFixture<PidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
