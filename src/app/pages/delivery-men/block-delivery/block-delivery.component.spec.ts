import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDeliveryComponent } from './block-delivery.component';

describe('BlockDeliveryComponent', () => {
  let component: BlockDeliveryComponent;
  let fixture: ComponentFixture<BlockDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
