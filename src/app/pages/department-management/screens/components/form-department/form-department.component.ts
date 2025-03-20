import {
  Component,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { IDropdownItem } from '@vks/app/shared/models';
import { IDepartmentForm } from '@vks/app/pages/department-management/models';

@Component({
  selector: 'vks-form-department',
  templateUrl: './form-department.component.html',
  styleUrl: './form-department.component.scss',
})
export class FormDepartmentComponent {
  @Input()
  errors: Record<keyof IDepartmentForm, string[]> = {
    name: [],
    description: [],
    code: [],
    active: [],
    id: []
  };

  @Input()
  departmentDetail: Partial<IDepartmentForm> = {
    name: '',
    description: '',
    code: '',
    active: true,
  };

  @Output()
  unActiveForm = new EventEmitter();

  @Output() forward = new EventEmitter<IDepartmentForm>();

  submitted = false;

  listActive: IDropdownItem[] = [
    { label: 'Hoạt động', value: 'true' },
    { label: 'Không hoạt động', value: 'false' },
  ]

  departmentForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    code: ['', [Validators.required]],
    active: [true, [Validators.required]],
    id: [null],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentDetail'] && changes['departmentDetail'].currentValue) {
      const departmentData = changes['departmentDetail'].currentValue;
      
      // Update form with received data, including the id
      this.departmentForm.patchValue({
        id: departmentData.id,
        name: departmentData.name || '',
        description: departmentData.description || '',
        code: departmentData.code || '',
        active: departmentData.active !== undefined ? departmentData.active : true
      });
    }
  }

  onSubmit() {
    console.log('this.departmentForm.valid', this.departmentForm.valid);

    if (this.departmentForm.valid) {
      this.submitted = false;
      this.forward.emit(this.departmentForm.value);
    } else {
      this.submitted = true;
      this.departmentForm.markAllAsTouched();
    }
  }

  onCloseModal() {
    this.unActiveForm.emit();
    this.resetForm();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.departmentForm.get(fieldName);
    return (field?.errors?.required &&
      field.touched &&
      this.submitted) as boolean;
  }

  resetForm() {
    this.submitted = false;
    this.departmentForm.reset({
      name: '',
      description: '',
      code: '',
      active: true,
    });

    Object.keys(this.departmentForm.controls).forEach((key) => {
      const control = this.departmentForm.get(key) as FormControl;
      control.markAsPristine();
      control.markAsUntouched();
      control.updateValueAndValidity();
    });
  }
}
