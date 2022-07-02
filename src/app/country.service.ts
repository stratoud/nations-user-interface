import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Country } from './models/country';
import { Language } from './models/language';
import { CountryStats } from './models/countrystats';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CountryStatistics } from './models/countrystatistics';

@Injectable({
  providedIn: 'root',
})

export class CountryService {
  private homeUrl = 'http://localhost:8080/Nations/';
  private countriesUrl = this.homeUrl + 'allCountries';
  private countryLanguagesUrl = this.homeUrl + 'findLanguageByCountryId';
  private countryStatsUrl = this.homeUrl + 'getCountriesByGDP';
  private countryStatisticsUrl = this.homeUrl + 'getCountriesStatistics';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }

  getCountryLanguages(id: number): Observable<Language[]> {
    const languages = this.http.get<Language[]>(this.countryLanguagesUrl + '/' + id);
    return languages;
  }

  getCountriesStats(): Observable<CountryStats[]> {
    console.log('getCountriesStats is now called');
    return this.http.get<CountryStats[]>(this.countryStatsUrl);
  }

  getCountriesStatistics(id: number): Observable<CountryStatistics[]> {
    console.log('getCountriesStats is now called');
    return this.http.get<CountryStatistics[]>(this.countryStatisticsUrl+ '/' + id);
  }
}