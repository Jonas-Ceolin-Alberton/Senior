import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa.model';

@Component({
    selector: 'app-cadastro-pessoa',
    templateUrl: './cadastro-pessoa.component.html',
    styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
    @Output() fecharCadastroPessoasEvent: EventEmitter<any> = new EventEmitter();
    pessoa: Pessoa =  new Pessoa();
    
    constructor() { }

    ngOnInit() {
    }

    fecharCadastroPessoas(): void {
        this.fecharCadastroPessoasEvent.emit();
    }

    salvar(): void {
        console.log("salvou", this.pessoa);
    } 
}
