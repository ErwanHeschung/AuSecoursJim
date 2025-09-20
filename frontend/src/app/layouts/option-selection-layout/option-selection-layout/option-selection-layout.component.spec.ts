import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSelectionLayoutComponent } from './option-selection-layout.component';

describe('OptionSelectionLayoutComponent', () => {
  let component: OptionSelectionLayoutComponent;
  let fixture: ComponentFixture<OptionSelectionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionSelectionLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionSelectionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
