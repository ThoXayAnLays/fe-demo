import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { APP_CONFIG } from '@vks/environments/environment';

import {
  IListDepartmentInfo,
  IFilterForm,
  IParamsPagination,
} from './interfaces';
import { IBaseResponse } from '../base-response.interface';
import { IDepartmentForm } from '@vks/app/pages/department-management/models';
import { IDepartmentInfo } from '@vks/app/shared/models';

const mockDataList: IListDepartmentInfo = {
  content: [
    {
      id: 1,
      name: 'Phòng kế toán',
      code: 'KT',
      description: 'Phòng kế toán',
      active: true,
    },
    {
      id: 2,
      name: 'Phòng kỹ thuật',
      code: 'TECH',
      description: 'Phòng kỹ thuật',
      active: true,
    },
    {
      id: 3,
      name: 'Phòng nhân sự',
      code: 'HR',
      description: 'Phòng nhân sự',
      active: true,
    },
    {
      id: 4,
      name: 'Phòng kinh doanh',
      code: 'BD',
      description: 'Phòng kinh doanh',
      active: true,
    },
  ],
  totalRecords: 10,
};

@Injectable({
  providedIn: 'root',
})
export class DepartmentManagementService {
  baseUrl: string = APP_CONFIG.baseUrl;
  urlDepartments: string = `${APP_CONFIG.baseUrl}/api/v1/private/departments`;
  constructor(private http: HttpClient) {}

  getListDepartment<T>(
    data: IFilterForm,
    params: IParamsPagination,
    rawResponse?: false
  ): Observable<T>;
  getListDepartment<T>(
    data: IFilterForm,
    params: IParamsPagination,
    rawResponse: true
  ): Observable<IBaseResponse<T>>;
  getListDepartment<T>(
    data: IFilterForm,
    params: IParamsPagination,
    rawResponse: boolean = false
  ): Observable<any> {
    // console.log('rawResponse:', rawResponse)
    const httpParams = params
      ? new HttpParams({
          fromObject: {
            page: params.page.toString(),
            pageSize: params.pageSize.toString(),
          },
        })
      : new HttpParams();

    return this.http
      .post(this.urlDepartments, data, { params: httpParams })
      .pipe(
        map((response) => {
          if (rawResponse) {
            return response as IBaseResponse<T>;
          } else {
            return mockDataList as T;
          }
        })
      );
  }

  // getDetailDepartment<T>(departmentId: string, rawResponse?: false): Observable<T>;
  // getDetailDepartment<T>(
  //   departmentId: string,
  //   rawResponse: true
  // ): Observable<IBaseResponse<T>>;
  // getDetailDepartment<T>(
  //   departmentId: string,
  //   rawResponse: boolean = false
  // ): Observable<any> {
  //   return this.http.get(`${this.urlDepartments}/${departmentId}`).pipe(
  //     map((response) => {
  //       if (rawResponse) {
  //         return response as IBaseResponse<T>;
  //       } else {
  //         return response as T;
  //       }
  //     })
  //   );
  // }

  private apiUrl = 'https://67d91d0b00348dd3e2a98c1a.mockapi.io/api/v1/departments';


  getListDepartmentManagement(filter?: any, pageSize?: number, page?: number): Observable<IBaseResponse<IListDepartmentInfo>> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => {
        return {
          code: 200,
          message: 'Success',
          result: {
            content: data,
            totalRecords: data.length
          }
        };
      })
    );
  }

  getDetailDepartment(departmentId: string): Observable<IDepartmentInfo> {
    return this.http.get<IDepartmentInfo>(`${this.apiUrl}/${departmentId}`);
  }

  createDepartment(department: IDepartmentForm): Observable<IDepartmentInfo> {
    return this.http.post<IDepartmentInfo>(this.apiUrl, department);
  }

  updateDepartment(departmentId: string, department: IDepartmentForm): Observable<IDepartmentInfo> {
    return this.http.put<IDepartmentInfo>(`${this.apiUrl}/${departmentId}`, department);
  }

  deleteDepartment(departmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${departmentId}`);
  }
}
