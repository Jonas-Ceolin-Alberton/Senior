import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	status = true;
	constructor(private router: Router) { }

	ngOnInit() {
	}

	changeClassSidenav() {
		this.status = !this.status;
	}

	logout() {
		alert('Fazer logout!');
	}
}

