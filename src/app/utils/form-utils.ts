import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

    // Expresiones regulares
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static passwordPattern = '^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$';


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
        case 'pattern':
          console.log(errors['pattern'].requiredPattern);
          if(errors['pattern'].requiredPattern == this.namePattern){
            return `Debe Ingresar el Nombre y Apellido del usuario.`
          }
          if(errors['pattern'].requiredPattern == this.emailPattern){
            return `Verifique que la estructura del email sea valida.`
          }
          if(errors['pattern'].requiredPattern == this.notOnlySpacesPattern){
            return `El nombre del usuario no debe tener espacios.`
          }
          if(errors['pattern'].requiredPattern == this.passwordPattern){
            return `El Passwords debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.`
          }
          return `Los datos ingresados en el campo no son validos`
        default:
          return `Verifique los datos ingresados en el campo..`
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
