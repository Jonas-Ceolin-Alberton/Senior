import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { MatButtonModule } from '@angular/material/button';
import { ListaPessoasComponent } from './components/lista-pessoas/lista-pessoas.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { MatCardModule } from '@angular/material/card';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CadastroCheckinComponent } from './components/cadastro-checkin/cadastro-checkin.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PessoaAutocompletComponent } from './components/pessoa-autocomplet/pessoa-autocomplet.component';

@NgModule({
	declarations: [
		AppComponent,
		MenuPrincipalComponent,
		ListaPessoasComponent,
		CheckinComponent,
		CadastroPessoaComponent,
		CardComponent,
		CadastroCheckinComponent,
		PessoaAutocompletComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatButtonModule,
		MatCardModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		MatCheckboxModule,
		MatAutocompleteModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
