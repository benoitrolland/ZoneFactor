import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReyComponent } from './rey.component';

describe('ReyComponent', () => {
  let component: ReyComponent;
  let fixture: ComponentFixture<ReyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
