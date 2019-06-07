import { CheckInService } from './../../services/check-in.service';
import { CheckIn } from './../../models/checkin.model';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa.model';

@Component({
	selector: 'app-checkin',
	templateUrl: './checkin.component.html',
	styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
	checkins: Array<CheckIn> = [];
	exibirModalCadastroCheckin: boolean = false;

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
}
