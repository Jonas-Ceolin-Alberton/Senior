import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from './services/pessoa.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	status = true;
	constructor(private pessoaService: PessoaService) { }

	ngOnInit() {
		this.adicionarPessoas();
	}

	changeClassSidenav() {
		this.status = !this.status;
	}

	logout() {
		alert('Fazer logout!');
	}

	adicionarPessoas() {
		if(this.pessoaService.getAll().length == 0) {
			let pessoa: Pessoa = new Pessoa();
			pessoa.nome = 'Jose da Silva';
			pessoa.documento = '111.111.111-74';
			pessoa.telefone = '(48) 9999-9999';
			this.pessoaService.save(pessoa);

			pessoa.nome = 'Marcos Antonio';
			pessoa.documento = '222.222.222-73';
			pessoa.telefone = '(48) 8888-8888';
			this.pessoaService.save(pessoa);

			pessoa.nome = 'Pedro Aguiar';
			pessoa.documento = '333.333.333-72';
			pessoa.telefone = '(48) 7777-7777';
			this.pessoaService.save(pessoa);
		}
	}


}

