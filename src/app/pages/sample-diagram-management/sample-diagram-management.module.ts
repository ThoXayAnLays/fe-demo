import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ImageModule } from 'primeng/image';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SampleDiagramManagementComponent } from './screens/sample-diagram-management.component';
import { SampleDiagramRoutingModule } from './sample-diagram-routing.module';
import { SampleDiagramManagementHttpService } from './sample-diagram-management-http.service';
import { SampleDiagramManagementStateService } from './sample-diagram-management-state.service';
import { CollapseComponent } from './screens/components/collapse/collapse.component';
import { AddModalComponent } from './screens/components/add-modal/add-modal.component';
import { DiagramModalComponent } from '@vks/app/shared/ui-common/diagram-modal/diagram-modal';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    SampleDiagramManagementComponent,
    CollapseComponent,
    AddModalComponent,
  ],
  imports: [
    CommonModule,
    SampleDiagramRoutingModule,
    ButtonModule,
    PanelModule,
    IconFieldModule,
    InputIconModule,
    ReactiveFormsModule,
    PaginatorModule,
    FileUploadModule,
    ImageModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    DialogModule,
    DiagramModalComponent,
  ],
  providers: [
    SampleDiagramManagementHttpService,
    SampleDiagramManagementStateService,
  ],
})
export class SampleDiagramManagementModule {}
