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

	delete(elemento): void {
		let dados: Array<any> = this.getAll();
		let index = dados.findIndex( element =>  element.id === elemento.id );
		dados.splice(index, 1);
		localStorage.setItem(this.chave, JSON.stringify(dados));
	}

	save(elemento): void {
		elemento.id = this.generateId();
		let dados: Array<any> = this.getAll();
		dados.unshift(elemento);
	    localStorage.setItem(this.chave, JSON.stringify(dados));
	}

	private generateId(): string {
		return Math.random().toString(16).slice(2);
	}
}
