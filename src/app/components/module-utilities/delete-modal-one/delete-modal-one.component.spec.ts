import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalOneComponent } from './delete-modal-one.component';

describe('DeleteModalOneComponent', () => {
  let component: DeleteModalOneComponent;
  let fixture: ComponentFixture<DeleteModalOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteModalOneComponent]
    });
    fixture = TestBed.createComponent(DeleteModalOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
