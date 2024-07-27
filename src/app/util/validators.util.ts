import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.root?.get('password'); // Get the password control
    if (!passwordControl) {
      return null; // Handle missing password control gracefully
    }
    return passwordControl.value !== control.value ? { 'mismatch': true } : null;
  };
}
