import { Component, OnInit } from '@angular/core';

import { CountryStats } from '../models/countrystats';
import { Country } from '../models/country';
import { CountryService } from '../country.service';


@Component({
  selector: 'app-countries-stats',
  templateUrl: './countries-stats.component.html',
  styleUrls: ['./countries-stats.component.css']
})

export class CountriesStatsComponent implements OnInit {
  countrystats: CountryStats[] = [];
  displayedColumns: string[] = ['name', 'countryCode3', 'year', 'population', 'gdp'];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.getCountriesStats();
  }

  getCountriesStats(): void {
    document.getElementById('loading').style.display = 'block';
    this.countryService.getCountriesStats()
    .subscribe(Response => {
                  
        // If Response comes function
        // hideloader() is called
        if (Response) {
          document.getElementById('loading').style.display = 'none';
        }
        console.log(Response)
        this.countrystats = Response
    });;
  }

  onSelect(): void {
    
  }
}