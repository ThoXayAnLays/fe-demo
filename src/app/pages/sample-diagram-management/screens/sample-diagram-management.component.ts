import { Component, OnInit } from '@angular/core';
import {
  collapseDiagramPageDefault,
  collapseDiagramPageSize,
  DataCollapseMapType,
  IDiagram,
  TITLE,
} from '../models';
import {
  DepartmentCode,
  ICategoryItem,
  IUserInfo,
} from '@vks/app/shared/models';
import {
  CategoryService,
  LoadingService,
  UserInfoService,
} from '@vks/app/services';
import { IGetListDiagram } from '@vks/app/https/diagram-management/interfaces';
import { SampleDiagramManagementHttpService } from '../sample-diagram-management-http.service';
import { finalize, takeUntil, Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'vks-sample-diagram-management',
  templateUrl: './sample-diagram-management.component.html',
  styleUrl: './sample-diagram-management.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class SampleDiagramManagementComponent implements OnInit {
  readonly TITLE = TITLE;
  readonly pageSize = collapseDiagramPageSize;
  readonly pageDefault = collapseDiagramPageDefault;

  private destroyed$ = new Subject<void>();

  isVisibleCreateModal: boolean = false;
  isVisibleUpdateModal: boolean = false;
  isVisibleViewModal: boolean = false;

  userInfo: IUserInfo | null = null;
  totalEL: number = 8;
  first: number = 1;
  limit: number = 4;
  departmentList: ICategoryItem[] = [];
  textSearch: string = '';

  diagrams: IDiagram[] = [];
  selectedDiagram: IDiagram | null = null;

  dataCollapse: DataCollapseMapType = {};

  constructor(
    private categoryService: CategoryService,
    private userInfoService: UserInfoService,
    private diagramManagementService: SampleDiagramManagementHttpService,
    private diagramService: SampleDiagramManagementHttpService,
    private loadingService: LoadingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.userInfoService.userInfo$.subscribe((data) => {
      this.userInfo = data;
    });
    this.loadDiagrams();
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  loadDiagrams(): void {
    this.loadingService.showLoading(true);
    this.diagramService
      .getDiagrams()
      .pipe(
        finalize(() => this.loadingService.showLoading(false)),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (diagrams: any) => {
          this.diagrams = Array.isArray(diagrams) ? diagrams : [diagrams];
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load diagrams',
          });
        },
      });
  }
  
  findDepartmentById(id: number) {
    return this.departmentList.find((item) => item.id === id);
  }
  handleGetDataCollapsed(data: { searchData: IGetListDiagram; page: number }) {
    // this.textSearch = data.searchData.textSearch
    // this.diagramManagementService
    //     .getListDiagrams(data.searchData, data.page, this.pageSize)
    //     .pipe(
    //         finalize(() => this.loadingService.showLoading(false)),
    //         takeUntil(this.destroyService),
    //     )
    //     .subscribe((response) => {
    //         const currentDepartment = this.findDepartmentById(data.searchData.departmentId)
    //         if (currentDepartment && currentDepartment.code) {
    //             const arrList = response.content.map((item) => ({
    //                 id: item.id,
    //                 name: item.name,
    //                 url: item.url ? item.url : '',
    //             }))
    //             this.dataCollapse[currentDepartment.code] = {
    //                 list: [...arrList],
    //                 currentActivePage: response.page * this.pageSize,
    //                 totalRecords: response.totalRecords,
    //                 totalPages: response.totalPages,
    //             }
    //         }
    //     })
  }
  onOpenCreate() {
    this.isVisibleCreateModal = true;
  }
  onCloseCreateModal() {
    this.isVisibleCreateModal = false;
    this.loadDiagrams();
  }
  onViewDiagram(diagram: IDiagram): void {
    this.selectedDiagram = diagram;
    this.isVisibleViewModal = true;
  }

  onCloseViewModal(): void {
    this.isVisibleViewModal = false;
    this.selectedDiagram = null;
  }
  onEditDiagram(diagram: IDiagram): void {
    this.selectedDiagram = diagram;
    this.isVisibleUpdateModal = true;
  }

  onCloseUpdateModal(): void {
    this.isVisibleUpdateModal = false;
    this.selectedDiagram = null;
  }

  onUpdateDiagram(updatedDiagram: IDiagram): void {
    if (!updatedDiagram.id) {
      console.error('Missing diagram ID for update');
      return;
    }
    console.log('Updating diagram with data:', updatedDiagram);
    this.loadingService.showLoading(true);

    this.diagramService.setDiagram(updatedDiagram.id, updatedDiagram);

    const updateData = {
      name: updatedDiagram.name,
      image: updatedDiagram.image,
      dataNode: updatedDiagram.dataNode,
      dataLink: updatedDiagram.dataLink,
    };

    this.diagramManagementService
      .updateDiagram(updatedDiagram.id, updateData)
      .pipe(
        finalize(() => this.loadingService.showLoading(false)),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Diagram updated successfully',
          });
          this.onCloseUpdateModal();
          this.loadDiagrams();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update diagram',
          });
        },
      });
  }
  onDeleteDiagram(diagram: IDiagram): void {
    if (!diagram.id) {
      return;
    }
    this.confirmationService.confirm({
      message: `Are you sure you want to delete diagram "${diagram.name}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loadingService.showLoading(true);
        this.diagramManagementService
          .deleteDiagram(diagram.id || '')
          .pipe(
            finalize(() => this.loadingService.showLoading(false)),
            takeUntil(this.destroyed$)
          )
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Diagram deleted successfully',
              });
              this.loadDiagrams();
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete diagram',
              });
            },
          });
      },
    });
  }
}
