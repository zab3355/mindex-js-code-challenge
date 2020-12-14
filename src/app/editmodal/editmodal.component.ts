import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.css']
})
export class EditModalComponent {
  employee: Employee;
  
 constructor(private toastr: ToastrService, private employeeService: EmployeeService, public dialogRef: MatDialogRef<EditModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void{ 
    this.employee = { ...this.data };
    this.toastr.success('Employee edited!');
  }

  cancel(){
    this.dialogRef.close(this.employee);
    this.toastr.info('Left modal.');
  }
}
