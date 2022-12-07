import {
  AbstractControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function ageValidator(control: AbstractControl): ValidationErrors | null {
  let dateOfBirth = new Date(control.value);

  console.log(control.value);

  let today = new Date();
  let legalBirthDay =
    today.getFullYear() -
    18 +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getDate();

  let legalDate = new Date(legalBirthDay);

  if (legalDate < dateOfBirth || control.value==='')
    return { ageError: 'ageError' };
  else {
    return null;
  }
}
