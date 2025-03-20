import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, Observable } from 'rxjs'

import { APP_CONFIG } from '@vks/environments/environment'

import { IFilterForm, IListAccountInfo, IParamsPagination } from './interfaces'
import { IBaseResponse } from '../base-response.interface'

const mockDataList: IListAccountInfo = {
    content: [
        {
            id: 1,
            username: 'ABC123',
            fullName: 'Trần Hoàng Sơn',
            roleName: 'VIEN_TRUONG',
            departmentName: 'Lãnh đạo',
            organizationName: 'Tp.Nam Định',
            status: 'Đang hoạt động',
        },
        {
            id: 2,
            username: 'ABC122',
            fullName: 'Trần Hoàng Thanh',
            roleName: 'KIEM_SAT_VIEN',
            departmentName: 'Lãnh đạn',
            organizationName: 'Tp.Nam Định',
            status: 'Chưa hoạt động',
        },
        {
            id: 3,
            username: 'VDWW223',
            fullName: 'Trần Hoàng Cung',
            roleName: 'PHO_PHONG',
            departmentName: 'Thiết bị',
            organizationName: 'Tp.Nam Định',
            status: 'Hoạt động',
        },
        {
            id: 4,
            username: 'TDFQ232',
            fullName: 'Trần Hoàng Sa',
            roleName: 'TRUONG_PHONG',
            departmentName: 'Hội sở',
            organizationName: 'Tp.Nam Định',
            status: 'Chưa hoạt động',
        },
    ],
    totalRecords: 10,
}

@Injectable({
    providedIn: 'root',
})
export class AccountManagementApiService {
    baseUrl: string = APP_CONFIG.baseUrl
    //TODO: remove later
    urlAccounts: string = `${APP_CONFIG.baseUrl}/api/v1/private/accounts`

    constructor(private http: HttpClient) {}

    getListAccount<T>(data: IFilterForm, params: IParamsPagination, rawResponse?: false): Observable<T>
    getListAccount<T>(data: IFilterForm, params: IParamsPagination, rawResponse: true): Observable<IBaseResponse<T>>
    getListAccount<T>(data: IFilterForm, params: IParamsPagination, rawResponse: boolean = false): Observable<any> {
        // console.log('rawResponse:', rawResponse)
        const httpParams = params
            ? new HttpParams({ fromObject: { page: params.page.toString(), pageSize: params.pageSize.toString() } })
            : new HttpParams()

        return this.http.post(this.urlAccounts, data, { params: httpParams }).pipe(
            map((response) => {
                if (rawResponse) {
                    return response as IBaseResponse<T>
                } else {
                    return mockDataList as T
                }
            }),
        )
    }

    getDetailAccount<T>(accountId: string, rawResponse?: false): Observable<T>
    getDetailAccount<T>(accountId: string, rawResponse: true): Observable<IBaseResponse<T>>
    getDetailAccount<T>(accountId: string, rawResponse: boolean = false): Observable<any> {
        return this.http.get(`${this.urlAccounts}/${accountId}`).pipe(
            map((response) => {
                if (rawResponse) {
                    return response as IBaseResponse<T>
                } else {
                    return response as T
                }
            }),
        )
    }
}
