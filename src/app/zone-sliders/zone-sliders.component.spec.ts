import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneSlidersComponent } from './zone-sliders.component';

describe('ZoneSlidersComponent', () => {
  let component: ZoneSlidersComponent;
  let fixture: ComponentFixture<ZoneSlidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneSlidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
