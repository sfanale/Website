import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { PropertiesComponent } from './properties/properties.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';


const routes : Routes = [
  {path: 'properties', component: PropertiesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: PropertyDetailComponent },

];

@NgModule({
  imports : [ RouterModule.forRoot(routes)],
  exports : [ RouterModule ]

})

export class AppRoutingModule { }

