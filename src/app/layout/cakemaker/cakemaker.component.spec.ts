import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakemakerComponent } from './cakemaker.component';

describe('CakemakerComponent', () => {
  let component: CakemakerComponent;
  let fixture: ComponentFixture<CakemakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakemakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakemakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
