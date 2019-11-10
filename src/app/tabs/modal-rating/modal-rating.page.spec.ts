import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRatingPage } from './modal-rating.page';

describe('ModalRatingPage', () => {
  let component: ModalRatingPage;
  let fixture: ComponentFixture<ModalRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRatingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
