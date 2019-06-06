import { PessoaService } from './../../services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa.model';

@Component({
	selector: 'app-lista-pessoas',
	templateUrl: './lista-pessoas.component.html',
	styleUrls: ['./lista-pessoas.component.css']
})
export class ListaPessoasComponent implements OnInit {
	pessoas: Array<Pessoa> = [];
	pessoaEditando: Pessoa;
	exibirModalCadastroPessoa: boolean = false;
	exibirModalEdicaoPessoa: boolean = false;

	constructor(private pessoaService: PessoaService) { }

	ngOnInit() {
		this.listarPessoas();
	}

	listarPessoas() {
		this.pessoas = this.pessoaService.getAll();
	}

	buildPessoas(): void {
		let pessoa: Pessoa =  new Pessoa();
		pessoa.nome = 'Lucas Retardado';
		pessoa.documento = 123456789;
		pessoa.telefone = "(48) 9999-1234";

		let pessoa2: Pessoa =  new Pessoa();
		pessoa2.nome = 'Gustavo Retardado';
		pessoa2.documento = 987654321;
		pessoa2.telefone = "(48) 9999-4567";

		this.pessoas.push(pessoa);
		this.pessoas.push(pessoa2);

	}

	exibirCadastroPessoas(): void {
		this.exibirModalCadastroPessoa = true;
	}

	fecharCadastroPessoas(): void {
		this.exibirModalCadastroPessoa = false;
	}

	exibirEdicaoPessoas(): void {
		this.exibirModalEdicaoPessoa = true;
	}

	fecharEdicaoPessoas(): void {
		this.exibirModalEdicaoPessoa = false;
	}

	atualizarLista() {
		this.pessoas = this.pessoaService.getAll();
	}

	editarPessoa(pessoa: Pessoa) {
		this.pessoaEditando = pessoa;
		this.exibirEdicaoPessoas();
	}

}
