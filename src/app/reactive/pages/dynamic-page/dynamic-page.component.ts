import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private formBuilder = inject(FormBuilder)

  formUtils = FormUtils;

  myFormDinamic: FormGroup = this.formBuilder.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    favoriteGames:this.formBuilder.array([
      ['Metal Gear',Validators.required],
      ['Death Stranding', Validators.required]
    ],Validators.minLength(2)),

  });

  newFavorite = new FormControl('',Validators.required)

  get favoriteGames(){
    return this.myFormDinamic.get('favoriteGames') as FormArray;
  }

  // isValidFieldInArray(formArray:FormArray, index:number){
  //   return ( formArray.controls[index].errors && formArray.controls[index].touched );
  // }

  onAddToFavorites(){
    if ( this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value
    this.favoriteGames.push(this.formBuilder.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  onDeleteFavorite(i:number){
    this.favoriteGames.removeAt(i);
  }

  onSubmit(){
    console.log(this.myFormDinamic.value);
    this.myFormDinamic.markAllAsTouched();
  }

}
