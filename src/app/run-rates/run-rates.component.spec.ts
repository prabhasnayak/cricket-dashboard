import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunRatesComponent } from './run-rates.component';

describe('RunRatesComponent', () => {
  let component: RunRatesComponent;
  let fixture: ComponentFixture<RunRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
