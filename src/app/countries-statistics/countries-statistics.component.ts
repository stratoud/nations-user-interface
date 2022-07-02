import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryStatistics } from '../models/countrystatistics';
import { YearStats } from '../models/yearstats';
import { Country } from '../models/country';
import { CountryService } from '../country.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-countries-statistics',
  templateUrl: './countries-statistics.component.html',
  styleUrls: ['./countries-statistics.component.css']
})
export class CountriesStatisticsComponent implements OnInit {
  initialcountrystatistics: CountryStatistics[] = [];
  countries: Country[] = [];
  yearsAvailable : YearStats[] = [];
  displayedColumns: string[] = ['countryName', 'continentName', 'regionName', 'year', 'population', 'gdp'];
  yearFrom = null;
  yearTo = null;
  pageSizes = [10,20,30];
  dataSource: MatTableDataSource<CountryStatistics>;
  countrySelectedName = '';

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    document.getElementById('loading').style.display = 'block';
    this.countryService.getCountries()
      .subscribe(Response => {
        if (Response) {
          this.countries = Response;
          this.countrySelectedName = this.countries[0].name;
          this.getCountriesStatistics(this.countries[0].countryId);
        }
      });
  }

  refreshDataTable(data): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  getCountriesStatistics(countryId): void {
    if (this.countries.length > 0){
      document.getElementById('loading').style.display = 'block';
      this.countryService.getCountriesStatistics(countryId)
      .subscribe(Response => {
                    
          // If Response comes function
          // hideloader() is called
          if (Response) {
            document.getElementById('loading').style.display = 'none';
          }
          console.log(Response)
          this.initialcountrystatistics = Response;
          this.refreshDataTable(this.initialcountrystatistics);
          if (this.initialcountrystatistics  != undefined){
            this.yearFrom = this.initialcountrystatistics[0].year;
            this.yearTo =  this.initialcountrystatistics[this.initialcountrystatistics.length - 1].year;
          }
          this.yearsAvailable = [];
          for (let stat of this.initialcountrystatistics) {
            this.yearsAvailable.push({disabledFrom : 'false', disabledTo : 'false', year : stat.year });
          }
      });
    }

  }

  onYearChangeFrom(item) {
    console.log('year from ' + item);
    this.yearFrom = item;
    var newStatList = new Array<CountryStatistics>();
    for (let stat of this.initialcountrystatistics) {
        if (Number(stat.year) >= Number(item) 
            && Number(stat.year) <= Number(this.yearTo)){
            newStatList.push(stat);
        }
    }
    for (let yearStat of this.yearsAvailable) {
      yearStat.disabledTo = 'false';
      if (Number(yearStat.year) < Number(this.yearFrom)){
        yearStat.disabledTo = 'true';
      }
    }
    this.refreshDataTable(newStatList);
  }

  onYearChangeTo(item) {
    console.log('year to ' + item);
    this.yearTo = item;
    var newStatList = new Array<CountryStatistics>();
    for (let stat of this.initialcountrystatistics) {
        if (Number(stat.year) <= Number(item)
            && Number(stat.year) >= Number(this.yearFrom)){
            newStatList.push(stat);
        }
    }
    for (let yearStat of this.yearsAvailable) {
      yearStat.disabledFrom = 'false';
      if (Number(yearStat.year) > Number(this.yearTo)){
        yearStat.disabledFrom = 'true';
      }
    }
    this.refreshDataTable(newStatList);
  }

  onSelect(): void {
    
  }

}
