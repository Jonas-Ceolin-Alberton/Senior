import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export abstract class AbstractService<T> {
	private chave: string;
	constructor(_chave: string) {
		this.chave = _chave;
	 }

	getAll(): Array<T> {
		return JSON.parse(localStorage.getItem(this.chave)) || [];
	}

	getById(id: string): T {
		let dados: Array<any> = this.getAll();
		return dados.find( element =>  element.id === id );
	}

	update(elemento): void {
		let dados: Array<any> = this.getAll();
		let index = dados.findIndex( element =>  element.id === elemento.id );
		dados[index] = elemento;
		localStorage.setItem(this.chave, JSON.stringify(dados));
	}

	save(elemento): void {
		let dados: Array<any> = this.getAll();
		dados.unshift(elemento);
	    localStorage.setItem(this.chave, JSON.stringify(dados));
	}
}
