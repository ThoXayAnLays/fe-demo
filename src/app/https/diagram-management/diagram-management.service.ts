import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { APP_CONFIG } from '@vks/environments/environment'
import { ICreateDiagram, ICreateDiagramRes, IGetListDiagram, IParamsPagination } from './interfaces'
import { map, Observable } from 'rxjs'
import { IBaseResponse } from '../base-response.interface'
@Injectable({
    providedIn: 'root',
})
export class DiagramManagementService {
    baseUrl: string = APP_CONFIG.baseUrl
    // urlSampleDiagram: string = `${this.baseUrl}/api/v1/private/mindmap-template`
    urlSampleDiagram: string = 'https://67d91d0b00348dd3e2a98c1a.mockapi.io/api/v1/diagrams'
    constructor(private http: HttpClient) {}
    getListDiagrams<T>(data: IGetListDiagram, params: IParamsPagination): Observable<T> {
        return this.http
            .get<T>(`${this.urlSampleDiagram}/${data.departmentId}/department`, {
                params: { ...params, textSearch: data.textSearch },
            })
            .pipe(map((response) => (response as IBaseResponse<T>).result))
    }
    createDiagrams(data: ICreateDiagram): Observable<IBaseResponse<ICreateDiagramRes>> {
        return this.http.post<IBaseResponse<ICreateDiagramRes>>(`${this.urlSampleDiagram}`, data)
    }

    getDiagramById(id: number): Observable<IBaseResponse<any>> {
        return this.http.get<IBaseResponse<any>>(`${this.urlSampleDiagram}/${id}`)
    }
    
    updateDiagram(id: number, data: any): Observable<IBaseResponse<any>> {
        return this.http.put<IBaseResponse<any>>(`${this.urlSampleDiagram}/${id}`, data)
    }
    
    deleteDiagram(id: number): Observable<IBaseResponse<any>> {
        return this.http.delete<IBaseResponse<any>>(`${this.urlSampleDiagram}/${id}`)
    }
}
