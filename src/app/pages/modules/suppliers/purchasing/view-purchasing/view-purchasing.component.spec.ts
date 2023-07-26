import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchasingComponent } from './view-purchasing.component';

describe('ViewPurchasingComponent', () => {
  let component: ViewPurchasingComponent;
  let fixture: ComponentFixture<ViewPurchasingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPurchasingComponent]
    });
    fixture = TestBed.createComponent(ViewPurchasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
