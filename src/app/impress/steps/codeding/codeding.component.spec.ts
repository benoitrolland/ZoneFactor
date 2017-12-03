import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodedingComponent } from './codeding.component';

describe('CodedingComponent', () => {
  let component: CodedingComponent;
  let fixture: ComponentFixture<CodedingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodedingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
