import { PessoaService } from './../../services/pessoa.service';
import { Pessoa } from './../../models/pessoa.model';
import { Component, OnInit, forwardRef, ViewChild, Input, AfterViewChecked } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PessoaAutocompletComponent),
        multi: true,
    },];


@Component({
	selector: 'app-pessoa-autocomplet',
	templateUrl: './pessoa-autocomplet.component.html',
	styleUrls: ['./pessoa-autocomplet.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]

})
export class PessoaAutocompletComponent implements OnInit, ControlValueAccessor {
	@ViewChild('form') form: any;
	@Input() placeholder: string;

	pessoa: Pessoa;
	options: Array<Pessoa> = [];
	filteredOptions: Observable<Pessoa[]>;

	constructor(private pessoaService: PessoaService) {	}

	ngOnInit() {
		this.buscarPessoas();
		requestAnimationFrame(() => {
			this.listenValuechange();
		});
	}

	listenValuechange() {
		this.filteredOptions = this.form.controls.pessoa.valueChanges
			.pipe(
				startWith(''),
				map(value => typeof value === 'string' ? value : (value as any).nome),
				map(name => name ? this._filter(name) : this.options.slice())
			);
	}

	buscarPessoas() {
		this.options = this.pessoaService.getAll();
	}

	displayFn(pessoa?: Pessoa): string | undefined {
		return pessoa ? pessoa.nome : undefined;
	}

	private _filter(name: any): Pessoa[] {
		const filterValue = name.toLowerCase();

		return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
	}

	selection(option: Pessoa) {
		this.pessoa = option;
		this.onChange();
	}

	public writeValue(pessoa: any) {
        if (pessoa) {
            this.pessoa = pessoa;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    
    registerOnTouched(fn: any): void { }

    private propagateChange = (_: any) => { };

    onChange() {
        setTimeout(() => {
            this.propagateChange(this.pessoa);
        });
    }
}
