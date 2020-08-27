import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedBarComponent } from './logedBar.component';

describe('LogedBarComponent', () => {
  let component: LogedBarComponent;
  let fixture: ComponentFixture<LogedBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogedBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
