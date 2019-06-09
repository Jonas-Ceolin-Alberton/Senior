import { Injectable } from '@angular/core';
import { AbstractService } from './base/abstract.service';
import { CheckIn } from '../models/checkin.model';
import * as moment from 'moment';

const VALOR_DIARIA_SEGUNDA_A_SEXTA = 120;
const VALOR_ACRESCIMO_GARAGEM_SEGUNDA_A_SEXTA = 15;
const VALOR_DIARIA_FINAL_DE_SEMANA = 150;
const VALOR_ACRESCIMO_GARAGEM_FINAL_DE_SEMANA = 20;
const tempoLimiteEmMinutos = 60 * 16.5;  // 16:30 pm
const DAY_OF_WEEK = 'E';
const SABADO = 7;
const DOMINGO = 1;

const CHAVE_CHECKIN = 'CHAVE_CHECKIN';

@Injectable({
	providedIn: 'root'
})
export class CheckInService extends AbstractService<CheckIn>{

	constructor() {
		super(CHAVE_CHECKIN);
	}

	public buscarPessoasPresentes() {
		let lista = this.getAll();
		let dataAtual = moment(new Date);

		return lista.filter( checkin => {
			return dataAtual.isBefore(checkin.dataSaida);
		})
	}

	public buscarPessoasNaoPresentes() {
		let lista = this.getAll();
		let dataAtual = moment(new Date);

		return lista.filter( checkin => {
			return dataAtual.isAfter(checkin.dataSaida);
		})
	}

	public calcularValorDiaria(checkin: CheckIn): number {
		let dataEntradaMoment = moment(checkin.dataEntrada);
		let dataSaidaMoment = moment(checkin.dataSaida);
		let qtdDias = dataSaidaMoment.diff(dataEntradaMoment, 'days');

		let dias = [];

		for (let index = 1; index <= qtdDias; index++) {
			dias.push(moment(checkin.dataEntrada).add(index, 'day'));
		}

		let diasFinalDeSemana = this.getDiasFinaisDeSemana(dias);
		let diasNormais = this.getDiasNormais(dias);


		return this.calcularValorFinalDeSemana(diasFinalDeSemana, checkin.adicionalVeiculo)
			+ this.calcularValorSemana(diasNormais, checkin.adicionalVeiculo)
			+ this.calcularDiariaExtra(dataSaidaMoment, checkin.adicionalVeiculo);
	}

	private calcularValorSemana(diasNormais: moment.Moment[], adicionalVeiculo: boolean) {
		if (adicionalVeiculo) {
			return diasNormais.length * (VALOR_DIARIA_SEGUNDA_A_SEXTA + VALOR_ACRESCIMO_GARAGEM_SEGUNDA_A_SEXTA);
		} else {
			return diasNormais.length * VALOR_DIARIA_SEGUNDA_A_SEXTA;
		}
	}

	private calcularValorFinalDeSemana(diasFinalDeSemana: moment.Moment[], adicionalVeiculo: boolean) {
		if (adicionalVeiculo) {
			return diasFinalDeSemana.length * (VALOR_DIARIA_FINAL_DE_SEMANA + VALOR_ACRESCIMO_GARAGEM_FINAL_DE_SEMANA);
		} else {
			return diasFinalDeSemana.length * VALOR_DIARIA_FINAL_DE_SEMANA;
		}
	}

	private getDiasFinaisDeSemana(dias: moment.Moment[]) {
		return dias.filter(dia => {
			let diaDaSemana = dia.get(DAY_OF_WEEK);
			if (diaDaSemana == SABADO || diaDaSemana == DOMINGO) {
				return dia;
			}
			return;
		});
	}

	private getDiasNormais(dias: moment.Moment[]) {
		return dias.filter(dia => {
			let diaDaSemana = dia.get(DAY_OF_WEEK);
			if (diaDaSemana !== SABADO && diaDaSemana !== DOMINGO) {
				return dia;
			}
			return
		});
	}

	private calcularDiariaExtra(dataSaida: moment.Moment, adicionalVeiculo: boolean) {
		const dataSaidaToMinute = dataSaida.minutes() + dataSaida.hours() * 60;
		if (dataSaidaToMinute > tempoLimiteEmMinutos) {
			const isFinalDeSemana = dataSaida.get(DAY_OF_WEEK) == SABADO || dataSaida.get(DAY_OF_WEEK) == DOMINGO
			if (isFinalDeSemana) {
				return VALOR_DIARIA_FINAL_DE_SEMANA + (adicionalVeiculo ? VALOR_ACRESCIMO_GARAGEM_FINAL_DE_SEMANA : 0);
			} else {
				return VALOR_DIARIA_SEGUNDA_A_SEXTA + (adicionalVeiculo ? VALOR_ACRESCIMO_GARAGEM_SEGUNDA_A_SEXTA : 0);
			}
		}
		return 0;
	}
}
