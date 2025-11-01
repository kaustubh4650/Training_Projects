import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeesApi } from '../../service/employees-api';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  imports: [],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails {
  protected title: string = `Details of : `;
  private _employeesApi = inject(EmployeesApi);
  private _employeesApiSubscription: Subscription;
  protected employee: Employee;
  // @Input() empId: number;
  // @Input() subTitle: string;
  // @Output() sendConfirmMsg: EventEmitter<string> = new EventEmitter<string>();
  private _activatedRoute = inject(ActivatedRoute);

  // protected onProcess(): void {
  //   this.sendConfirmMsg.emit(`Name is ${this.employee.employeeName}!`);
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  //   this._employeesApiSubscription = this._employeesApi.getEmployeeDetails(this.empId).subscribe({
  //     next: (data) => (this.employee = data),
  //     error: (err) => console.log(err),
  //   });
  // }

  ngOnInit(): void {
    let empId = this._activatedRoute.snapshot.params['id'];
    this._employeesApiSubscription = this._employeesApi.getEmployeeDetails(empId).subscribe({
      next: (data) => (this.employee = data),
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    if (this._employeesApiSubscription) {
      this._employeesApiSubscription.unsubscribe();
    }
  }
}
