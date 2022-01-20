import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsToWatchComponent } from './animals-to-watch.component';

describe('AnimalsToWatchComponent', () => {
  let component: AnimalsToWatchComponent;
  let fixture: ComponentFixture<AnimalsToWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalsToWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsToWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
