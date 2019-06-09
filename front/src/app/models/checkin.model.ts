import { Pessoa } from './pessoa.model';

export class CheckIn {
    id:string;
    pessoa: Pessoa;
    dataEntrada: Date;
    dataSaida: Date;
    adicionalVeiculo: true;
}
