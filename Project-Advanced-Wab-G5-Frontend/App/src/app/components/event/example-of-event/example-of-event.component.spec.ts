import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleOfEventComponent } from './example-of-event.component';

describe('ExampleOfEventComponent', () => {
  let component: ExampleOfEventComponent;
  let fixture: ComponentFixture<ExampleOfEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleOfEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleOfEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
