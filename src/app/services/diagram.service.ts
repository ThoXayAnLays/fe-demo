import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { IDiagram } from '../pages/sample-diagram-management/models';


export class diagramService {
    API_URL = 'https://67d91d0b00348dd3e2a98c1a.mockapi.io/api/v1/diagrams';

    departmentInfo$ = new BehaviorSubject<IDiagram | null>(null);
    
    constructor(private http: HttpClient) {
        this.departmentInfo$.asObservable();
    }

    getDiagram(): Observable<IDiagram> {
        return this.http.get<IDiagram>(this.API_URL).pipe(
            switchMap((res) => {
                return of(res);
            })
        );
    }

    setDiagram(departmentInfo$: IDiagram | null) {
        if (departmentInfo$) {
            this.departmentInfo$.next(departmentInfo$);
        }
    }
};