import { Component, OnInit, Input } from '@angular/core';
import { Language } from '../models/language';
import { CountryService } from '../country.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-languages',
  templateUrl: './country-languages.component.html',
  styleUrls: ['./country-languages.component.css']
})
export class CountryLanguagesComponent implements OnInit {
  languages: Language[] = [];

  constructor(private route: ActivatedRoute,
              private countryService: CountryService,
              private location: Location
    ) { }

  ngOnInit() {
    this.getCountryLanguages();
  }

  getCountryLanguages(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.countryService.getCountryLanguages(id)
      .subscribe(languages => this.languages = languages);
  }
  
  goBack(): void {
    this.location.back();
  }
}
