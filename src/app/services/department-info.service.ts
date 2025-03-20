import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

import { DepartmentCode, IDepartmentInfo, RoleAccount } from '@vks/app/shared/models';
import { HttpClient } from '@angular/common/http';
import { IBaseResponse } from '@vks/app/https/base-response.interface';
import { APP_CONFIG } from '@vks/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DepartmentInfoService {
    baseUrl = `${APP_CONFIG.baseUrl}/api/v1/private/accounts/get-department-info`;

    departmentInfo$ = new BehaviorSubject<IDepartmentInfo | null>({
        id: 1,
        code: 'PB_LANH_DAO',
        name: 'Phòng ban lãnh đạo',
        active: true,
        description: 'Phòng ban lãnh đạo'
    });

    constructor(private http: HttpClient) {
        this.departmentInfo$.asObservable();
    }

    getDepartmentInfo(): Observable<IDepartmentInfo> {
        return this.http.get<IBaseResponse<IDepartmentInfo>>(this.baseUrl).pipe(
            switchMap((res) => {
                return of(res.result);
            })
        );
    }

    setDepartmentInfo(departmentInfo$: IDepartmentInfo | null) {
        if (departmentInfo$) {
            this.departmentInfo$.next(departmentInfo$);
        }
    }
}
