import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingCheckImagesComponent } from './purchasing-check-images.component';

describe('PurchasingCheckImagesComponent', () => {
  let component: PurchasingCheckImagesComponent;
  let fixture: ComponentFixture<PurchasingCheckImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasingCheckImagesComponent]
    });
    fixture = TestBed.createComponent(PurchasingCheckImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
