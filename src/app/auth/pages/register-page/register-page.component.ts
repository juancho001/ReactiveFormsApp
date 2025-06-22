import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private formBuilder = inject(FormBuilder)

  formUtil = FormUtils

  myForm:FormGroup = this.formBuilder.group({
    name:[null,Validators.required],
    email:[null,Validators.required,Validators.email],
    username:[null,Validators.required,Validators.minLength(6)],
    passwords:[null,Validators.required,Validators.minLength(6)],
    confirmPasswords:[null,Validators.required]
})

onSubmit(){
  this.myForm.markAllAsTouched();

}

}
