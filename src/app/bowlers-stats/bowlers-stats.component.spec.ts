import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlersStatsComponent } from './bowlers-stats.component';

describe('BowlersStatsComponent', () => {
  let component: BowlersStatsComponent;
  let fixture: ComponentFixture<BowlersStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowlersStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowlersStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
