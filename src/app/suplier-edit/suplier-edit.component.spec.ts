import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplierEditComponent } from './suplier-edit.component';

describe('SuplierEditComponent', () => {
  let component: SuplierEditComponent;
  let fixture: ComponentFixture<SuplierEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuplierEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
