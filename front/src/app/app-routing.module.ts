import { CheckinComponent } from './components/checkin/checkin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPessoasComponent } from './components/lista-pessoas/lista-pessoas.component';

const routes: Routes = [
  { path: 'pessoas', component: ListaPessoasComponent },
  { path: 'check-in', component: CheckinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
