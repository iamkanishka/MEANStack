import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulberyComponent } from './mulbery.component';

describe('MulberyComponent', () => {
  let component: MulberyComponent;
  let fixture: ComponentFixture<MulberyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulberyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulberyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
