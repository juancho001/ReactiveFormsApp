import { Country } from './../../interfaces/country.interfaces';
import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  formBuilder = inject(FormBuilder);
  countryServices = inject(CountryService);
  regions = signal(this.countryServices.regions);
  countruesByRegions = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.formBuilder.group({
    region:['',Validators.required],
    country:['',Validators.required],
    border:['',Validators.required],

  })


}
