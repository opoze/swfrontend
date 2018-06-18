import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplierDetailComponent } from './suplier-detail.component';

describe('SuplierDetailComponent', () => {
  let component: SuplierDetailComponent;
  let fixture: ComponentFixture<SuplierDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuplierDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
