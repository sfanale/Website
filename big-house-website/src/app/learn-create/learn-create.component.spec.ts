import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { LearnCreateComponent } from './learn-create.component';

describe('LearnCreateComponent', () => {
  let component: LearnCreateComponent;
  let fixture: ComponentFixture<LearnCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
