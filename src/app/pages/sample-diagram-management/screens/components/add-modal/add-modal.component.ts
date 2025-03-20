import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { regexNameDiagram, TITLE } from '../../../models';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  DepartmentCode,
  ICategoryItem,
  IUserInfo,
} from '@vks/app/shared/models';
import { SampleDiagramManagementHttpService } from '../../../sample-diagram-management-http.service';
import { LoadingService } from '@vks/app/services';
import { finalize } from 'rxjs';
import { DiagramModalComponent } from '@vks/app/shared/ui-common/diagram-modal/diagram-modal';

@Component({
  selector: 'vks-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() isEditMode = false;
  @Input() diagramToEdit: any = null;
  @Input() userInfo: IUserInfo | null = null;
  @Input() departmentList: ICategoryItem[] = [];

  @Output() cancel = new EventEmitter();
  @Output() diagramCreated = new EventEmitter<boolean>();
  @Output() diagramUpdated = new EventEmitter<any>();

  readonly TITLE = TITLE;
  isVisibleDiagramEditor = false;
  diagramData = {
    id: undefined,
    name: '',
    dataNode: '',
    dataLink: '',
    image: '',
  };

  modalData = this.fb.group({
    name: ['', [Validators.required, this.nameValidator()]],
  });

  constructor(
    private fb: FormBuilder,
    private diagramService: SampleDiagramManagementHttpService,
    private loadingService: LoadingService
  ) {
    this.modalData = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(regexNameDiagram)]],
    });
  }

  ngOnInit(): void {
    // Initialization code if needed
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If editing, populate form with existing diagram data
    if (this.isEditMode && this.diagramToEdit && this.modalData) {
      this.modalData.patchValue({
        name: this.diagramToEdit.name || '',
      });

      this.diagramData = {
        id: this.diagramToEdit.id,
        name: this.diagramToEdit.name || '',
        dataNode: this.diagramToEdit.dataNode || '',
        dataLink: this.diagramToEdit.dataLink || '',
        image: this.diagramToEdit.image || '',
      };
    }
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !regexNameDiagram.test(control.value as string);
      return forbidden ? { invalidName: { value: control.value } } : null;
    };
  }

  onCancel(): void {
    this.modalData.reset();
    this.cancel.emit();
  }

  onCreate(): void {
    if (this.isEditMode) {
      this.onUpdate();
      return;
    }

    this.loadingService.showLoading(true);

    const createData = {
      name: this.modalData.value.name || '',
    };

    this.diagramService
      .createDiagram(createData)
      .pipe(finalize(() => this.loadingService.showLoading(false)))
      .subscribe({
        next: () => {
          this.diagramCreated.emit(true);
          this.modalData.reset();
          this.cancel.emit();
        },
        error: (err) => console.error('Error creating diagram', err),
      });
  }

  onUpdate(): void {
    if (!this.diagramToEdit || !this.diagramToEdit.id) {
      console.error('No diagram ID for update');
      return;
    }

    this.loadingService.showLoading(true);

    const updateData = {
      ...this.diagramToEdit,
      name: this.modalData.value.name || this.diagramToEdit.name,
      // Keep other properties from diagramToEdit
    };

    this.diagramUpdated.emit(updateData);
    this.modalData.reset();
  }

  openDiagramEditor(): void {
    // Set diagram name from form
    if (this.isEditMode && this.diagramToEdit) {
      console.log('Editing diagram with data:', this.diagramToEdit); 
      this.diagramData = {
        id: this.diagramToEdit.id,
        name: this.modalData.value.name || this.diagramToEdit.name,
        dataNode: this.diagramToEdit.dataNode || '',
        dataLink: this.diagramToEdit.dataLink || '',
        image: this.diagramToEdit.image || '',
      };
    } else {
      this.diagramData = {
        id: undefined,
        name: this.modalData.value.name || '',
        dataNode: '',
        dataLink: '',
        image: '',
      };
    }
    this.isVisibleDiagramEditor = true;
  }

  closeDiagramEditor(): void {
    this.isVisibleDiagramEditor = false;
  }

  saveDiagram(diagramData: any): void {
    // Update the diagram data from diagram modal
    this.diagramData = {
      id: diagramData.id,
      name: diagramData.name,
      image: diagramData.image,
      dataNode: diagramData.dataNode,
      dataLink: diagramData.dataLink,
    };
    this.closeDiagramEditor();

    if (this.isEditMode) {
      // For update, emit the updated diagram
      this.diagramUpdated.emit(this.diagramData);
      this.modalData.reset();
      this.cancel.emit();
    } else {
      // For create, call the create API
      this.loadingService.showLoading(true);
      this.diagramService
        .createDiagram(this.diagramData)
        .pipe(finalize(() => this.loadingService.showLoading(false)))
        .subscribe({
          next: () => {
            this.diagramCreated.emit(true);
            this.modalData.reset();
            this.cancel.emit();
          },
          error: (err: any) =>
            console.error('Error creating diagram with data', err),
        });
    }
  }
}
