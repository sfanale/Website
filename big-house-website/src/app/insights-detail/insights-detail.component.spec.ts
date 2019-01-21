import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { InsightsDetailComponent } from './insights-detail.component';

describe('InsightsDetailComponent', () => {
  let component: InsightsDetailComponent;
  let fixture: ComponentFixture<InsightsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
