import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CachesetComponent } from './cacheset.component';

describe('CachesetComponent', () => {
  let component: CachesetComponent;
  let fixture: ComponentFixture<CachesetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CachesetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CachesetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
