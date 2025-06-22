import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
  static isValidField(form: FormGroup, fielName: string): boolean | null {
    //  console.log(this.myForm.controls[fielName].valid)
    return (form.controls[fielName].errors && form.controls[fielName].touched);
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {

    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);

  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {

    if (formArray.controls.length == 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);

  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].errors && formArray.controls[index].touched);
  }


  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
        case 'email':
          return `El valor ingresado no es un correo valido..`;
      }

    }
    return null;
  }

  // static onSave(form:FormGroup ){
  //   if(form.invalid){
  //     form.markAllAsTouched();
  //     return;
  //   }
  //   form.reset({
  //     price:0,
  //     inStorage:0
  //   })
  // }

}
