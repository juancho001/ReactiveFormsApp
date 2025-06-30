import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  getCountryBoderByCodes(borders:string[]){
    // TODO: Por Hacer
  }

}
