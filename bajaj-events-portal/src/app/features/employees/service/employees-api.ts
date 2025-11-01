import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { CudResponse } from '../../../shared/models/cud-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApi {
  private _baseUrl: string = 'http://localhost:9090/api';
  // private _baseUrl: string = 'http://192.168.1.34:9090/api';

  private _httpClient = inject(HttpClient);
  public getAllEvents(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(`${this._baseUrl}/employees`);
  }

  public getEmployeeDetails(employeeId: number): Observable<Employee> {
    return this._httpClient.get<Employee>(`${this._baseUrl}/employees/${employeeId}`);
  }

  public addNewEmployee(employee: Employee): Observable<CudResponse> {
    return this._httpClient.post<CudResponse>(`${this._baseUrl}/employees`, employee);
  }
}
