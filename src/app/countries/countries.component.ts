import { Component, OnInit } from '@angular/core';

import { Country } from '../models/country';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    document.getElementById('loading').style.display = 'block';
    this.countryService.getCountries()
    .subscribe(Response => {
                  
      // If Response comes function
      // hideloader() is called
      if (Response) {
        document.getElementById('loading').style.display = 'none';
      }
      console.log(Response)
      this.countries = Response
    });;
  }

  onSelect(): void {
    
  }
}