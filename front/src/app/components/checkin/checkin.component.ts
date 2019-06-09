import { CheckInService } from './../../services/check-in.service';
import { CheckIn } from './../../models/checkin.model';
import { Component, OnInit } from '@angular/core';
import { TipoFiltro } from 'src/app/models/tipo-fltro.enum';

@Component({
	selector: 'app-checkin',
	templateUrl: './checkin.component.html',
	styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
	checkins: Array<CheckIn> = [];
	exibirModalCadastroCheckin: boolean = false;
	filtro: TipoFiltro = TipoFiltro.TODOS;

	constructor(private checkinService: CheckInService) { }

	ngOnInit() {
		this.buscarCheckins();
	}

	buscarCheckins() {
		this.checkins = this.checkinService.getAll();
	}

	exibirCadastroCheckin(): void {
		this.exibirModalCadastroCheckin = true;
	}

	fecharCadastroCheckin(): void {
		this.exibirModalCadastroCheckin = false;
	}

	atualizarLista() {
		this.checkins = this.checkinService.getAll();
	}

	alterarFiltro() {
		switch (this.filtro) {
			case TipoFiltro.PRESENTES:
				this.checkins = this.checkinService.buscarPessoasPresentes();
				break;
			case TipoFiltro.NAO_PRESENTES:
				this.checkins = this.checkinService.buscarPessoasNaoPresentes();
				break;
			default:
				this.atualizarLista();
		}
	}
}
