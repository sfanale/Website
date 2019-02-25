import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {MessagesComponent} from "./messages/messages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ResearchComponent} from "./research/research.component";
import {TradeComponent} from "./trade/trade.component";
import {UsersComponent} from "./users/users.component";
import {AccountComponent} from "./account/account.component";
import {OptionsComponent} from "./options/options.component";
import {OptionDetailComponent} from "./option-detail/option-detail.component";
import {ModelsComponent} from "./models/models.component";
import {StockDetailComponent} from "./stock-detail/stock-detail.component";
import {LearnComponent} from "./learn/learn.component";
import {InsightsComponent} from "./insights/insights.component";
import {InsightsDetailComponent} from "./insights-detail/insights-detail.component";
import {InsightsCreateComponent} from "./insights-create/insights-create.component";
import {LearnDetailComponent} from "./learn-detail/learn-detail.component";
import {LearnCreateComponent} from "./learn-create/learn-create.component";
import {MessageDetailComponent} from "./message-detail/message-detail.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {AlertComponent} from "./alert";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {DataAPIinfoComponent} from "./data-apiinfo/data-apiinfo.component";


@NgModule({

  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.

    AppModule,
    ServerModule,
    ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {}
