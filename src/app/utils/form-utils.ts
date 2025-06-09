import { FormGroup } from "@angular/forms";

export class FormUtils{
  static isValidField( form:FormGroup, fielName:string):boolean | null{
  //  console.log(this.myForm.controls[fielName].valid)
  return ( form.controls[fielName].errors && form.controls[fielName].touched );
}

static getFieldError(form:FormGroup, fieldName:string):string | null{

  if(!form.controls[fieldName]) return null;

  const errors = form.controls[fieldName].errors ?? {};

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
