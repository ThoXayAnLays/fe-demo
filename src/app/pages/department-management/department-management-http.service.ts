import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentManagementService } from '@vks/app/https/department-management/diagram-management.service';
import { IBaseResponse } from '@vks/app/https/base-response.interface';
import {
  IListDepartmentInfo,
  IFilterForm,
  IDepartmentInfo,
} from '@vks/app/https/department-management/interfaces';

@Injectable()
export class DepartmentManagementHttpService {
  constructor(
    private departmentManagementService: DepartmentManagementService
  ) {}

  getListDepartmentManagement(
    data: IFilterForm,
    pageSize: number,
    page: number
  ): Observable<IBaseResponse<IListDepartmentInfo>> {
    return this.departmentManagementService.getListDepartmentManagement()
  }

  getDetailDepartment(departmentId: string): Observable<IDepartmentInfo> {
    return this.departmentManagementService.getDetailDepartment(
      departmentId
    );
  }

  createDepartment(data: IDepartmentInfo): Observable<IDepartmentInfo> {
    return this.departmentManagementService.createDepartment(data);
  }

  updateDepartment(departmentId: string, data: IDepartmentInfo): Observable<IDepartmentInfo> {
    return this.departmentManagementService.updateDepartment(departmentId, data);
  }

  deleteDepartment(departmentId: string): Observable<IDepartmentInfo> {
    return this.departmentManagementService.deleteDepartment(departmentId);
  }
}
