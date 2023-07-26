import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingPage } from './purchasing.page';

describe('PurchasingPage', () => {
  let component: PurchasingPage;
  let fixture: ComponentFixture<PurchasingPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasingPage]
    });
    fixture = TestBed.createComponent(PurchasingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
