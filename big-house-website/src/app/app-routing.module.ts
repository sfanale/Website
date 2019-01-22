import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {ResearchComponent} from "./research/research.component";
import {TradeComponent} from "./trade/trade.component";
import {UsersComponent} from "./users/users.component";
import {OptionsComponent} from "./options/options.component";
import {OptionDetailComponent} from "./option-detail/option-detail.component";
import {ModelsComponent} from "./models/models.component";


const routes : Routes = [
  {path: '', component: DashboardComponent},
  {path: 'trade/:id', component: TradeComponent},
  {path: 'trade', component: TradeComponent},
  {path: 'account',component:UsersComponent},
  {path: 'research', component:OptionsComponent},
  {path: 'options/detail/:sym', component: OptionDetailComponent},
  {path: 'models', component: ModelsComponent}
];

@NgModule({
  imports : [ RouterModule.forRoot(routes)],
  exports : [ RouterModule ]

})

export class AppRoutingModule { }

