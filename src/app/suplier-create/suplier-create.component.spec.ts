import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplierCreateComponent } from './suplier-create.component';

describe('SuplierCreateComponent', () => {
  let component: SuplierCreateComponent;
  let fixture: ComponentFixture<SuplierCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuplierCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplierCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
