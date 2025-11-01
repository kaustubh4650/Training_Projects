import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesLists } from './categories-lists';

describe('CategoriesLists', () => {
  let component: CategoriesLists;
  let fixture: ComponentFixture<CategoriesLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
