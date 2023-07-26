import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingQualityChecksComponent } from './purchasing-quality-checks.component';

describe('PurchasingQualityChecksComponent', () => {
  let component: PurchasingQualityChecksComponent;
  let fixture: ComponentFixture<PurchasingQualityChecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasingQualityChecksComponent]
    });
    fixture = TestBed.createComponent(PurchasingQualityChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
