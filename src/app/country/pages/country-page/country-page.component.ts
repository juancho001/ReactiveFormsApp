import { Country } from './../../interfaces/country.interfaces';
import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  formBuilder = inject(FormBuilder);
  countryServices = inject(CountryService);
  regions = signal(this.countryServices.regions);
  countriesByRegions = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  })

  // TODO: Los efectos en Angular se disparan tan pronto el componente se monta

  onFormChanged = effect((onCleanup) => {
    //const formRegionChanged = this.myForm.get('region')!.valueChanges.subscribe((value) => {console.log({value});});
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();


    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
      console.log('unsubscribe')
    })

  })

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges.pipe(
      tap(() => this.myForm.get('country')?.setValue('')),
      tap(() => this.myForm.get('border')?.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegions.set([]);
      }),
      switchMap((region) => this.countryServices.getCountriesByRegion(region ?? ''))
    ).subscribe((countries) => { this.countriesByRegions.set(countries) })
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
    .pipe(
      tap(()=> this.myForm.get('border')!.setValue('')),
      filter( value => value!.length > 0),
      switchMap(alphaCode => this.countryServices.getCountryByAlphaCode(alphaCode ?? '')),
      switchMap(country => this.countryServices.getCountryByCodeArray(country.borders) )
    )
    .subscribe((borders) => {
      // console.log({ borders });
      this.borders.set(borders)
    }
    )
  }

}
