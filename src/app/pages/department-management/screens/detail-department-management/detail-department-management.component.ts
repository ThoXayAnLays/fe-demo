import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { NotificationService } from "@vks/app/services/notification.service";
import { EMPTY, switchMap } from "rxjs";

import { DepartmentManagementHttpService } from "@vks/app/pages/department-management/department-management-http.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'vks-detail-department-management',
  templateUrl: './detail-department-management.component.html',
  styleUrls: ['./detail-department-management.component.scss']
})
export class DetailDepartmentManagementComponent implements OnInit {

  constructor(
    private departmentManagementHttpService: DepartmentManagementHttpService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      switchMap((params) => {
        return this.getDetailDepartment((params.departmentId) as string)
      })
    ).subscribe()
  }

  getDetailDepartment(departmentId: string) {
    return this.departmentManagementHttpService.getDetailDepartment(departmentId).pipe(
      catchError((error) => {
        if(error.message){
          this.notificationService.showMessage({
            severity: 'error',
            summary: 'Lỗi hệ thống',
            detail: error.message
          })
        }
        return EMPTY
      })
    )
  }
}