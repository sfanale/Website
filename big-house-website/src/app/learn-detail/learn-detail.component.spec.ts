import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { LearnDetailComponent } from './learn-detail.component';

describe('LearnDetailComponent', () => {
  let component: LearnDetailComponent;
  let fixture: ComponentFixture<LearnDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
