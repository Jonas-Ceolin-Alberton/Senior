import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCheckinComponent } from './cadastro-checkin.component';

describe('CadastroCheckinComponent', () => {
  let component: CadastroCheckinComponent;
  let fixture: ComponentFixture<CadastroCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
