import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { InsightsCreateComponent } from './insights-create.component';

describe('InsightsCreateComponent', () => {
  let component: InsightsCreateComponent;
  let fixture: ComponentFixture<InsightsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
