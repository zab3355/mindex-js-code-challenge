import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EditModalComponent } from '../editmodal/editmodal.component';
import { DeleteModalComponent } from '../deletemodal/deletemodal.component';

import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {catchError, map, reduce} from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  compensation: number;
  totalemployees: number;

  employees: Employee[] = [];
  directReports: Employee[] = [];

  @ViewChild('modalHolder', { read: ViewContainerRef, static: false }) modalHolder;
  
  constructor(private employeeService: EmployeeService, private toastr: ToastrService, private resolver: ComponentFactoryResolver,private dialog: MatDialog) {
  }

  ngOnInit(): void{
    this.getReports(this.employee, true);
  }  

  //Retrieving a report
  getReports(employee: Employee, hasReport: boolean): void{
    if (employee.directReports){
      employee.directReports.forEach( (e) => {
        this.employeeService.get(e).pipe(
          catchError(this.handleError.bind(this))
        ).subscribe(emp=> {
          this.getReports(emp, false);
          this.employees.push(emp);
          if (hasReport) this.directReports.push(emp);
        });
      })
    }
  }

    //Open edit modal
    editModal(reports: Employee): void {
      const dialogRef = this.dialog.open(EditModalComponent, {
        data: reports
      });
  
      dialogRef.afterClosed().subscribe(result => {
        reports.firstName = result.firstName;
        reports.lastName = result.lastName;
        reports.position = result.position;
        reports.compensation = result.compensation;
        this.edit.emit(result);
      });
    }
  
    //Open delete modal
    deleteModal(reports: Employee): void {
      const dialogRef = this.dialog.open(DeleteModalComponent, {
        data: reports
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (!!result && !!result.id) {
          this.delete.emit(result);
        }
      });
    }

  //Error handler from employee-list
  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
