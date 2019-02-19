import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { DataAPIinfoComponent } from './data-apiinfo.component';

describe('DataAPIinfoComponent', () => {
  let component: DataAPIinfoComponent;
  let fixture: ComponentFixture<DataAPIinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAPIinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAPIinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
