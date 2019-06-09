import { UtilService } from './../../shared/util.service';
import { CheckInService } from './../../services/check-in.service';
import { CheckIn } from './../../models/checkin.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa.model';

@Component({
	selector: 'app-cadastro-checkin',
	templateUrl: './cadastro-checkin.component.html',
	styleUrls: ['./cadastro-checkin.component.css']
})
export class CadastroCheckinComponent implements OnInit {
	@Output() fecharCadastroCheckinEvent: EventEmitter<any> =  new EventEmitter();
	@Output() atualizarListaCheckinEvent: EventEmitter<any> = new EventEmitter();
	checkin: CheckIn = new CheckIn();

	constructor(private checkinservice: CheckInService,
				private utilService: UtilService) {
		this.checkin.pessoa = new Pessoa();
	 }

	ngOnInit() {
	}

	fecharCadastroCheckin(): void {
		this.fecharCadastroCheckinEvent.emit();
	}

	salvar() {
		this.checkinservice.save(this.checkin);
		this.utilService.openSnackBar('Check-in salvo com sucesso!', 'fechar');
		this.atualizarLista();
		this.fecharCadastroCheckin();
	}
	
	atualizarLista() {
		this.atualizarListaCheckinEvent.emit();
	}


}
