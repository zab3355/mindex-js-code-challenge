import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css']
})
export class DeleteModalComponent {

 constructor(private toastr: ToastrService, private employeeService: EmployeeService, public dialogRef: MatDialogRef<DeleteModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

submit(){
  this.dialogRef.close(this.data);

  this.toastr.success('Employee deleted!');
}

cancel(){
  this.dialogRef.close();
  this.toastr.info('Left modal.');
}

}
