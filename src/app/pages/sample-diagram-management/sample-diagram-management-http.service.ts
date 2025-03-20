import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDiagram } from './models';

@Injectable({
  providedIn: 'root',
})
export class SampleDiagramManagementHttpService {
  private API_URL =
    'https://67d91d0b00348dd3e2a98c1a.mockapi.io/api/v1/diagrams';

  constructor(private http: HttpClient) {}

  createDiagram(diagram: any): Observable<any> {
    return this.http.post(this.API_URL, diagram);
  }

  getDiagrams(): Observable<IDiagram[]> {
    return this.http.get<IDiagram[]>(this.API_URL);
  }

  getDiagram(id: string): Observable<IDiagram> {
    return this.http.get<IDiagram>(`${this.API_URL}/${id}`);
  }

  setDiagram(id: string, diagram: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, diagram);
  }

  updateDiagram(id: string, diagram: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, diagram);
  }

  deleteDiagram(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
