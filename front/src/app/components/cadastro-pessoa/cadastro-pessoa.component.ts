import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-cadastro-pessoa',
    templateUrl: './cadastro-pessoa.component.html',
    styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {
    @Output() fecharCadastroPessoasEvent: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }

    fecharCadastroPessoas(): void {
        this.fecharCadastroPessoasEvent.emit();
    }

}
