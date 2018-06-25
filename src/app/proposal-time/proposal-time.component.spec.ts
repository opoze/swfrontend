import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalTimeComponent } from './proposal-time.component';

describe('ProposalTimeComponent', () => {
  let component: ProposalTimeComponent;
  let fixture: ComponentFixture<ProposalTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
