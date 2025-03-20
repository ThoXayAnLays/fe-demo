import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';
import { combineLatest, delay, finalize, takeUntil } from 'rxjs';
import { Observable } from 'rxjs';

import {
  ConfigHeader,
  DefaultFilterData,
  FilterConfig,
  ListDepartmentActionConfig,
} from '@vks/app/pages/department-management/models';
import { DepartmentManagementHttpService } from '@vks/app/pages/department-management/department-management-http.service';
import {
  IDepartmentInfo,
  IFilterForm,
} from '@vks/app/https/department-management/interfaces';
import {
  DEFAULT_TABLE_PAGE,
  DEFAULT_TABLE_SIZE,
  ICategoryItem,
  KeyAction,
  KeyCategory,
  RoleAccount,
} from '@vks/app/shared/models';
import { ERoute } from '@vks/app/shared/layout/layout.model';
import { actionConfig } from '@vks/app/shared/ui-common/table-common/table.common.config';
import {
  CategoryService,
  LoadingService,
  DepartmentInfoService,
} from '@vks/app/services';
import { IDepartmentForm } from '@vks/app/pages/department-management/models/interfaces';
import { FormatDatePipe } from '@vks/app/shared/pipe';

@Component({
  selector: 'vks-department-management',
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.scss',
  providers: [FormatDatePipe],
})
export class DepartmentManagementComponent {
  readonly title = 'Danh sách phòng ban';
  readonly filterConfig = FilterConfig;
  readonly configHeader = ConfigHeader;

  readonly KeyAction = KeyAction;

  defaultFilterData = DefaultFilterData;
  listDepartment: IDepartmentInfo[] = [];
  totalRecords = 0;
  currentActivePage = 1;
  page = DEFAULT_TABLE_PAGE;
  pageSize = DEFAULT_TABLE_SIZE;
  actionConfig = [...ListDepartmentActionConfig];
  isVisibleModal = false;

  constructor(
    private departmentManagementHttpService: DepartmentManagementHttpService,
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private departmentInfoService: DepartmentInfoService,
    private router: Router
  ) {}

  selectedDepartment: Partial<IDepartmentForm> | null = null;

  ngOnInit(): void {
    combineLatest([this.departmentInfoService.departmentInfo$]).subscribe(
      ([department]) => {
        if (!department) return;
      }
    );

    this.handleGetDepartmentManagement();
    this.actionConfig = this.actionConfig.map((action) => {

      // return {
      //   ...action,
      //   command: (item: IDepartmentForm) => this.onEdit(item),
      // };
      if (action.key === KeyAction.UPDATE) {
        return {
          ...action,
          command: (item: IDepartmentForm) => this.onEdit(item),
        };
      }
      if (action.key === KeyAction.REMOVE) {
        return {
          ...action,
          command: (item: IDepartmentForm) => this.onDelete(item),
        };
      }
      return action;
    });
  }

  getActionConfigForItem(item: IDepartmentInfo): any[] {
    return this.actionConfig.map(action => ({
      ...action,
      command: () => {
        if (action.key === KeyAction.UPDATE) {
          this.onEdit(item);
        } else if (action.key === KeyAction.REMOVE) {
          this.onDelete(item);
        }
      }
    }));
  }

  isDisableRemoveButton(itemActionConfig: actionConfig): boolean {
    return itemActionConfig.key === KeyAction.REMOVE;
  }

  onPageChange(page: PaginatorState) {
    if (page.page !== undefined) {
      this.currentActivePage = page.page + 1;
      this.handleGetDepartmentManagement();
    }
  }

  onSearch(data: any) {
    // You could implement filtering if API supports it
    this.handleGetDepartmentManagement();
  }

  onFilter(filter: IFilterForm) {
    // You could implement filtering if API supports it
    this.handleGetDepartmentManagement();
  }

  onEdit(item: IDepartmentForm & { id?: string | number }) {
    console.log('Dữ liệu edit', item);
    if (!item.id) return;
    
    this.loadingService.showLoading(true);
    this.departmentManagementHttpService
      .getDetailDepartment(item.id.toString())
      .pipe(finalize(() => this.loadingService.showLoading(false)))
      .subscribe({
        next: (department) => {
          this.selectedDepartment = {
            id: department.id,
            name: department.name,
            code: department.code,
            description: department.description,
            active: department.active
          };
          this.isVisibleModal = true;
        },
        error: (error) => {
          console.error('Error fetching department details:', error);
        }
      });
  }

  onDelete(item: IDepartmentForm & { id?: string | number }) {
    console.log('Dữ liệu delete', item);
    if (!item.id) return;
    
    if (confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) {
      this.loadingService.showLoading(true);
      this.departmentManagementHttpService
        .deleteDepartment(item.id.toString())
        .pipe(finalize(() => this.loadingService.showLoading(false)))
        .subscribe({
          next: () => {
            this.handleGetDepartmentManagement();
          },
          error: (error: any) => {
            console.error('Error deleting department:', error);
          }
        });
    }
  }

  onOpenModal() {
    this.selectedDepartment = null; // Reset for new creation
    this.isVisibleModal = true;
  }

  onCloseModal() {
    this.selectedDepartment = null;
    this.isVisibleModal = false;
  }

  onDoubleClickRow(item: IDepartmentForm & { id?: string | number }) {
    this.onEdit(item);
  }

  onSubmit(formData: IDepartmentForm) {
    this.loadingService.showLoading(true);
    
    let request: Observable<any>;
    const departmentId = (this.selectedDepartment as any)?.id?.toString();
    
    // Create department data conforming to IDepartmentInfo
    const departmentData: IDepartmentInfo = {
      name: formData.name,
      code: formData.code,
      description: formData.description || '',
      active: formData.active || true,
      id: formData.id || 0,
    };
    
    if (this.selectedDepartment && departmentId) {
      // Update existing department
      request = this.departmentManagementHttpService.updateDepartment(departmentId, departmentData);
    } else {
      // Create new department
      request = this.departmentManagementHttpService.createDepartment(departmentData);
    }
    
    request
      .pipe(finalize(() => this.loadingService.showLoading(false)))
      .subscribe({
        next: () => {
          this.isVisibleModal = false;
          this.selectedDepartment = null;
          this.handleGetDepartmentManagement();
        },
        error: (error) => {
          console.error('Error saving department:', error);
        }
      });
  }

  handleGetDepartmentManagement() {
  this.loadingService.showLoading(true);
  this.departmentManagementHttpService
    .getListDepartmentManagement(
      this.defaultFilterData,
      this.pageSize,
      this.currentActivePage
    )
    .pipe(finalize(() => this.loadingService.showLoading(false)))
    .subscribe({
      next: (data) => {
        this.listDepartment = data.result.content;
        this.totalRecords = data.result.totalRecords;
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      }
    });
}
}
