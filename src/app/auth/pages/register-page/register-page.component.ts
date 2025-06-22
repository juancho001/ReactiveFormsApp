import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private formBuilder = inject(FormBuilder)

  formUtil = FormUtils

  myForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.pattern(this.formUtil.namePattern)]],
    email: [null, [Validators.required, Validators.email, Validators.pattern(this.formUtil.emailPattern)],[FormUtils.chekingServerResponse]],
    username: [null, [Validators.required, Validators.minLength(6), Validators.pattern(this.formUtil.notOnlySpacesPattern)]],
    passwords: [null, [Validators.required, Validators.minLength(8), Validators.pattern(this.formUtil.passwordPattern)]],
    confirmPasswords: [null, [Validators.required, Validators.pattern(this.formUtil.passwordPattern)]],
  },
   {
      validators: [this.formUtil.isFieldOneEqualsToFieldTwo('passwords', 'confirmPasswords')]
   }
  )





  onSubmit() {
    this.myForm.markAllAsTouched();

  }

}
