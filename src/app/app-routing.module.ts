import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryLanguagesComponent } from './country-languages/country-languages.component';
import { CountriesStatsComponent } from './countries-stats/countries-stats.component';
import { CountriesStatisticsComponent } from './countries-statistics/countries-statistics.component';

const routes: Routes = [
  { path: '', component: CountriesComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countriesstats', component: CountriesStatsComponent },
  { path: 'countriesstatistics', component: CountriesStatisticsComponent },
  { path: 'details/:id', component: CountryLanguagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }