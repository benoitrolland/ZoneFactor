import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamountComponent } from './paramount.component';

describe('ParamountComponent', () => {
  let component: ParamountComponent;
  let fixture: ComponentFixture<ParamountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
