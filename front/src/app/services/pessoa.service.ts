import { Injectable } from '@angular/core';
import { AbstractService } from './base/abstract.service';
import { Pessoa } from '../models/pessoa.model';

const CHAVE_PESSOA = 'CHAVE_PESSOA';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends AbstractService<Pessoa>{

  constructor() {
    super(CHAVE_PESSOA);
   }
}
