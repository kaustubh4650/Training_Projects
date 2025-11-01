import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpaceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  //   if (value && value.indexOf(' ') >= 0) {
  //     return { noSpace: true };
  //   }

  if (value.trim().length !== value.length) {
    return { noSpace: true };
  }
  return null;
}
