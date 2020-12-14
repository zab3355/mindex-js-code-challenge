import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(){
    this.employeeService.getAll()
    .pipe(
      reduce((emps, e: Employee) => emps.concat(e), []),
      map(emps => this.employees = emps),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  editReport(emp) {
    this.employeeService
      .save(emp)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe();
}

  deleteReport(emp){
    this.employees = this.employees.filter(empl => empl.id !== emp.id);
    this.employeeService
      .remove(emp)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
