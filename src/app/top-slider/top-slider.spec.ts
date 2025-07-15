import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSlider } from './top-slider';

describe('TopSlider', () => {
  let component: TopSlider;
  let fixture: ComponentFixture<TopSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
