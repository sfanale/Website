import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {ResearchComponent} from "./research/research.component";
import {TradeComponent} from "./trade/trade.component";
import {UsersComponent} from "./users/users.component";
import {OptionsComponent} from "./options/options.component";
import {OptionDetailComponent} from "./option-detail/option-detail.component";
import {ModelsComponent} from "./models/models.component";
import {StockDetailComponent} from "./stock-detail/stock-detail.component";
import {LearnComponent} from "./learn/learn.component";
import {InsightsComponent} from "./insights/insights.component";
import {InsightsCreateComponent} from "./insights-create/insights-create.component";
import {InsightsDetailComponent} from "./insights-detail/insights-detail.component";


const routes : Routes = [
  {path: '', component: DashboardComponent},
  {path: 'trade/:id', component: TradeComponent},
  {path: 'trade', component: TradeComponent},
  {path: 'account',component:UsersComponent},
  {path: 'research', component:OptionsComponent},
  {path: 'research/options/:sym', component: OptionDetailComponent},
  {path: 'models', component: ModelsComponent},
  {path: 'research/stocks/:sym', component:StockDetailComponent},
  {path: 'research/learn', component:LearnComponent},
  {path: 'insights', component:InsightsComponent},
  {path: 'insights/create', component:InsightsCreateComponent},
  {path: 'insights/:id', component:InsightsDetailComponent}
];

@NgModule({
  imports : [ RouterModule.forRoot(routes)],
  exports : [ RouterModule ]

})

export class AppRoutingModule { }

