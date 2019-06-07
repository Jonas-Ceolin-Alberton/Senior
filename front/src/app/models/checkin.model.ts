import { Pessoa } from './pessoa.model';
import * as moment from 'moment';

export const VALOR_DIARIA_SEGUNDA_A_SEXTA = 120;
export const VALOR_ACRESCIMO_GARAGEM_SEGUNDA_A_SEXTA = 15;
export const VALOR_DIARIA_FINAL_DE_SEMANA = 150;
export const VALOR_ACRESCIMO_GARAGEM_FINAL_DE_SEMANA = 20;
export const DAY_OF_WEEK = 'E';
export const SABADO = 7;
export const DOMINGO = 1;

export class CheckIn {
    id:string;
    pessoa: Pessoa;
    dataEntrada: Date;
    dataSaida: Date;
    adicionalVeiculo: true;
    valor: number;
    
    
    calcularValor() {
        this.valor = this.valorDuranteSemana();
    }
    

     valorDuranteSemana() {
        let dtEntrada = moment(this.dataEntrada);
        let dtSaida = moment(this.dataSaida);
        let qtdDias =  dtSaida.diff(dtEntrada, 'days');

        let dias = [];

        for (let index = 1; index <= qtdDias ; index++) {
          dias.push(moment(this.dataEntrada).add(index, 'day'));
        }

        let diasFinalDeSeman = this.getDiasFinaisDeSemana(dias);
        let diasNormais = this.getDiasNormais(dias);


        let resultado = this.calcularValorFinalDeSemana(diasFinalDeSeman as any) + this.calcularValorSemana(diasNormais as any) + this.calcularDiariaExtra(dtSaida);  
        console.log('sad', dias);

        return resultado;
    }

    calcularValorSemana(diasNormais: moment.Moment[]) {
        if(this.adicionalVeiculo) {
           return  diasNormais.length * (VALOR_DIARIA_SEGUNDA_A_SEXTA + VALOR_ACRESCIMO_GARAGEM_SEGUNDA_A_SEXTA);
        } else {
           return diasNormais.length * VALOR_DIARIA_SEGUNDA_A_SEXTA;
        }
    }

    calcularValorFinalDeSemana(diasFinalDeSemana: moment.Moment[]) {
        if(this.adicionalVeiculo) {
            return  diasFinalDeSemana.length * (VALOR_DIARIA_FINAL_DE_SEMANA + VALOR_ACRESCIMO_GARAGEM_SEGUNDA_A_SEXTA);
         } else {
            return diasFinalDeSemana.length * VALOR_DIARIA_FINAL_DE_SEMANA;
         }
    }

    getDiasFinaisDeSemana(dias: moment.Moment[]) {
        return dias.filter(dia => {
            let diaDaSemana = dia.get(DAY_OF_WEEK);            
            if(diaDaSemana == SABADO|| diaDaSemana == DOMINGO) {
                return dia;
            }
            return;
        });
    }

    getDiasNormais(dias: moment.Moment[]) {
        return dias.filter(dia => {
            let diaDaSemana = dia.get(DAY_OF_WEEK);            
            if(diaDaSemana !== SABADO && diaDaSemana !== DOMINGO) {
                return dia;
            }
            return
        });
    } 

    calcularDiariaExtra(dataSaida: moment.Moment) {
        debugger
        const tempoLimiteEmMinutos = 60 * 16.5;  // 16:30 pm
        if (dataSaida.minutes() > tempoLimiteEmMinutos) {
            const isFinalDeSemana = dataSaida.get(DAY_OF_WEEK) == SABADO || dataSaida.get(DAY_OF_WEEK) == DOMINGO
            if(isFinalDeSemana) {
                return VALOR_DIARIA_FINAL_DE_SEMANA + (this.adicionalVeiculo ? VALOR_ACRESCIMO_GARAGEM_FINAL_DE_SEMANA : 0);
            } else {
                return VALOR_DIARIA_SEGUNDA_A_SEXTA + (this.adicionalVeiculo ? VALOR_ACRESCIMO_GARAGEM_SEGUNDA_A_SEXTA : 0);
            }
        } 
        return 0;

    }
}