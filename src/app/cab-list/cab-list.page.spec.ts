import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabListPage } from './cab-list.page';

describe('CabListPage', () => {
  let component: CabListPage;
  let fixture: ComponentFixture<CabListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
