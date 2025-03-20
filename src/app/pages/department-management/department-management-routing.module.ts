import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DepartmentManagementComponent } from "./screens/department-management.component";

const routes: Routes = [
  {
    path: '',
    component: DepartmentManagementComponent
  },
  // {
  //   path: 'detail',
  //   component: DetailDepartmentManagementComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentManagementRoutingModule { }
