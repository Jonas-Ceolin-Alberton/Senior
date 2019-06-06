import { Injectable } from '@angular/core';
import { AbstractService } from './base/abstract.service';
import { CheckIn } from '../models/checkin.model';

const CHAVE_CHECKIN = 'CHAVE_CHECKIN';

@Injectable({
	providedIn: 'root'
})
export class CheckInService extends AbstractService<CheckIn>{

	constructor() {
		super(CHAVE_CHECKIN);
	}
}
