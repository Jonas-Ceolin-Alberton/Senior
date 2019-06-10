import { PessoaService } from './../../services/pessoa.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa.model';
import { UtilService } from 'src/app/shared/util.service';

@Component({
    selector: 'app-cadastro-pessoa',
    templateUrl: './cadastro-pessoa.component.html',
    styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
    @Output() fecharCadastroPessoasEvent: EventEmitter<any> = new EventEmitter();
    @Output() atualizarListaPessoasEvent: EventEmitter<any> =  new EventEmitter();
    @Input() pessoaEditando: Pessoa;
    pessoa: Pessoa =  new Pessoa();

    constructor(private pessoaService: PessoaService,
                private utilService: UtilService) { }

    ngOnInit() {
        if(this.pessoaEditando) {
            this.pessoa = JSON.parse(JSON.stringify(this.pessoaEditando));
        }
    }

    fecharCadastroPessoas(): void {
        this.fecharCadastroPessoasEvent.emit();
    }

    salvar(): void {
        if(this.pessoaEditando) {
            this.pessoa.editando = false;
            this.pessoaService.update(this.pessoa);
            this.utilService.openSnackBar('Pessoa atualizada com sucesso!', 'fechar');
        } else {
            this.pessoaService.save(this.pessoa);
            this.utilService.openSnackBar('Pessoa cadastrada com sucesso!', 'fechar');
        }
        this.atualizarListaPessoasEvent.emit();
        this.fecharCadastroPessoasEvent.emit();
    } 

    getTitulo() {
        if(this.pessoaEditando) return 'Editando pessoa';
        return 'Cadastro de pessoas';
    }

    deletarPessoa() {
        if(confirm('Deseja realmente deletar essa pessoa?')) {
          this.pessoaService.delete(this.pessoa);
          this.utilService.openSnackBar('Pessoa deletada com sucesso!', 'fechar');
          this.atualizarListaPessoasEvent.emit();
          this.fecharCadastroPessoasEvent.emit();
        }
    }
}
