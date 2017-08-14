import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreComparisonComponent } from './score-comparison.component';

describe('ScoreComparisonComponent', () => {
  let component: ScoreComparisonComponent;
  let fixture: ComponentFixture<ScoreComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
