import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

private formBuilder = inject(FormBuilder);

myForm: FormGroup = this.formBuilder.group({
  name : ['',[Validators.required,Validators.minLength(3)]],
  price: [0,[Validators.required,Validators.min(10)]],
  inStorage: [0,[Validators.required,Validators.min(0)]],
})



  // myForm = new FormGroup({
  //   name : new FormControl(''),
  //   price : new FormControl(0),
  //   inStorage : new FormControl(0),

  // })


isValidField(fielName:string):boolean{
  //  console.log(this.myForm.controls[fielName].valid)
  return !!this.myForm.controls[fielName].errors
}

getFieldError(fieldName:string):string | null{

  if(!this.myForm.controls[fieldName]) return null;

  const errors = this.myForm.controls[fieldName].errors ?? {};

  for(const key of Object.keys(errors)){
    switch(key){
      case 'required':
        return 'Este campo es requerido';
      case 'minlength':
        return `Minimo de ${ errors['minlength'].requiredLength } caracteres.`;
      case 'min':
         return `Valor minimo de ${errors['min'].min}`;
    }

  }

  return null;

}





}
