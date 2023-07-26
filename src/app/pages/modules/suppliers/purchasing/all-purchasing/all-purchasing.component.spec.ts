import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPurchasingComponent } from './all-purchasing.component';

describe('AllPurchasingComponent', () => {
  let component: AllPurchasingComponent;
  let fixture: ComponentFixture<AllPurchasingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPurchasingComponent]
    });
    fixture = TestBed.createComponent(AllPurchasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
