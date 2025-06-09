import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private formBuilder = inject(FormBuilder)

  myFormDinamic: FormGroup = this.formBuilder.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    favoriteGames:this.formBuilder.array([
      ['Metal Gear',Validators.required],
      ['Death Stranding', Validators.required]
    ],Validators.minLength(2)),

  });

  get favoriteGames(){
    return this.myFormDinamic.get('favoriteGames') as FormArray;
  }

}
