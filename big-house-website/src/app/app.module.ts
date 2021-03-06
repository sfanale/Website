import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'hammerjs';
import 'web-animations-js';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResearchComponent } from './research/research.component';
import { TradeComponent } from './trade/trade.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { UsersComponent } from './users/users.component';
import { AccountComponent } from './account/account.component';
import { OptionsComponent } from './options/options.component';
import { OptionDetailComponent } from './option-detail/option-detail.component';
import { ModelsComponent } from './models/models.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { LearnComponent } from './learn/learn.component';
import { InsightsComponent } from './insights/insights.component';
import { InsightsDetailComponent } from './insights-detail/insights-detail.component';
import { InsightsCreateComponent } from './insights-create/insights-create.component';
import { MarkdownModule } from 'ngx-markdown';
import { LearnDetailComponent } from './learn-detail/learn-detail.component';
import { LearnCreateComponent } from './learn-create/learn-create.component';
import '../../node_modules/autotrack/autotrack.js';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AlertComponent } from './alert/alert.component';


// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DataAPIinfoComponent } from './data-apiinfo/data-apiinfo.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    ResearchComponent,
    TradeComponent,
    UsersComponent,
    AccountComponent,
    OptionsComponent,
    OptionDetailComponent,
    ModelsComponent,
    StockDetailComponent,
    LearnComponent,
    InsightsComponent,
    InsightsDetailComponent,
    InsightsCreateComponent,
    LearnDetailComponent,
    LearnCreateComponent,
    MessageDetailComponent,
    UserDetailComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    SubscriptionComponent,
    DataAPIinfoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'Fanale-Research'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    Title,

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent],

})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
