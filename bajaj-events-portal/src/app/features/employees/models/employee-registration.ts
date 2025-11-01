import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noSpaceValidator } from '../../../shared/validators/no-space-validators';

export class EmployeeRegistration {
  private _builder = new FormBuilder();

  employeeForm: FormGroup = this._builder.group({
    employeeId: [undefined, Validators.required],
    employeeName: ['', [Validators.required, noSpaceValidator]],
    address: [''],
    city: [''],
    zipcode: [undefined, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    skillSets: [''],
    country: [''],
    joiningDate: ['', Validators.required],
  });
}
