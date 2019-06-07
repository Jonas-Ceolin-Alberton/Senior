import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaAutocompletComponent } from './pessoa-autocomplet.component';

describe('PessoaAutocompletComponent', () => {
  let component: PessoaAutocompletComponent;
  let fixture: ComponentFixture<PessoaAutocompletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaAutocompletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaAutocompletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
