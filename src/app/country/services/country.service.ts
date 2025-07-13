import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1'
  private httpclient = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): String[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`
    return this.httpclient.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {

    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`
    return this.httpclient.get<Country>(url);
  }

  getCountryByCodeArray(countryCodes:string[]){
    if(!countryCodes || countryCodes.length == 0) return of([]);

    const conuntriesRequests: Observable<Country>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      conuntriesRequests.push(request);
    })

    return combineLatest(conuntriesRequests);


  }

}
