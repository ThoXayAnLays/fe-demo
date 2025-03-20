import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective, ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'
import { RippleModule } from 'primeng/ripple'
import { FilterCommonComponent } from '@vks/app/shared/ui-common/filter-common/filter-common.component'
import { MenuModule } from 'primeng/menu'
import { TableCommonComponent } from '@vks/app/shared/ui-common/table-common/table-common.component'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { ReactiveFormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'

import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import { DepartmentManagementStateService } from './department-management-state.service';
import { DepartmentManagementHttpService } from './department-management-http.service';
import { DepartmentManagementComponent } from './screens/department-management.component';
import { FormDepartmentComponent } from './screens/components/form-department/form-department.component';
import { DetailDepartmentManagementComponent } from './screens/detail-department-management/detail-department-management.component';
@NgModule({
  declarations: [
    DepartmentManagementComponent,
    FormDepartmentComponent,
    DetailDepartmentManagementComponent,
  ],
  imports: [
    CommonModule,
    DepartmentManagementRoutingModule,
    ButtonDirective,
    ToastModule,
    RippleModule,
    ButtonModule,
    FilterCommonComponent,
    MenuModule,
    TableCommonComponent,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  providers: [
    DepartmentManagementStateService,
    DepartmentManagementHttpService,
  ],
})
export class DepartmentManagementModule {}
