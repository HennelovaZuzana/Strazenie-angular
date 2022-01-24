import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchOffersComponent } from './watch-offers.component';

describe('WatchOffersComponent', () => {
  let component: WatchOffersComponent;
  let fixture: ComponentFixture<WatchOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
