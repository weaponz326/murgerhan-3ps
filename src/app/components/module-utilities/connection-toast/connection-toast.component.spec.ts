import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionToastComponent } from './connection-toast.component';

describe('ConnectionToastComponent', () => {
  let component: ConnectionToastComponent;
  let fixture: ComponentFixture<ConnectionToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionToastComponent]
    });
    fixture = TestBed.createComponent(ConnectionToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
