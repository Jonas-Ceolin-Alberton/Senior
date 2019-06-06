import { PessoaService } from './../../services/pessoa.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    pessoa: Pessoa =  new Pessoa();

    constructor(private pessoaService: PessoaService,
                private utilService: UtilService) { }

    ngOnInit() {
    }

    fecharCadastroPessoas(): void {
        this.fecharCadastroPessoasEvent.emit();
    }

    salvar(): void {
        this.pessoaService.save(this.pessoa);
        this.utilService.openSnackBar('Pessoa cadastrada com sucesso!', 'fechar');
        this.atualizarListaPessoasEvent.emit();
        this.fecharCadastroPessoasEvent.emit();
    } 
}
