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
import {LearnCreateComponent} from "./learn-create/learn-create.component";
import {LearnDetailComponent} from "./learn-detail/learn-detail.component";
import {AccountComponent} from "./account/account.component";
import {MessagesComponent} from "./messages/messages.component";
import {MessageDetailComponent} from "./message-detail/message-detail.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {AuthGuard} from "./_guards";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {SubscriptionComponent} from "./subscription/subscription.component";

const routes : Routes = [
  {path: 'about', component: DashboardComponent},
  //{path: 'trade/:id', component: TradeComponent},
  {path: 'trade', component: TradeComponent},
  {path: 'account',component:AccountComponent , canActivate: [AuthGuard]},
  {path: 'explore', component:ResearchComponent},
  {path: 'research', component:OptionsComponent},
  {path: '', component:OptionsComponent},
  {path: 'research/options/:sym', component: OptionDetailComponent},
  {path: 'models', component: ModelsComponent, canActivate: [AuthGuard]},
  {path: 'research/stocks/:sym', component:StockDetailComponent},
  {path: 'insights', component:InsightsComponent},
  {path: 'insights/create', component:InsightsCreateComponent},
  {path: 'insights/:id', component:InsightsDetailComponent},
  {path: 'learn', component:LearnComponent},
  {path: 'learn/:id', component:LearnDetailComponent},
  {path: 'learn/create', component:LearnCreateComponent},
  {path: 'inbox', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'inbox/:id', component:MessageDetailComponent, canActivate: [AuthGuard]},
  {path: 'user/:username', component: UserDetailComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'account/subscription', component: SubscriptionComponent,  canActivate: [AuthGuard]}

];

@NgModule({
  imports : [ RouterModule.forRoot(routes)],
  exports : [ RouterModule ]

})

export class AppRoutingModule { }

